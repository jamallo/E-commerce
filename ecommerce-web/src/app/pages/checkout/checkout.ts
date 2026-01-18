import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BasketItem } from '../../shared/basket/basket.model';
import { BasketService } from '../../shared/basket/basket';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PedidoService } from '../../shared/pedido/pedido.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../../shared/spinner/spinner.service';
import { Direccion } from '../../shared/direccion/direccion.model';
import { DireccionService } from '../perfil/perfil-direcciones/direccion.service';
import { of, map } from 'rxjs';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { PagoService } from '../../core/service/pago.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';


type CheckoutStep = 'direccion' | 'confirmacion';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})


export class CheckoutComponent implements OnInit {

  step: CheckoutStep = 'direccion';


  items: BasketItem[] = [];
  total = 0;

  formularioEnvio!: FormGroup;
  cargando = false;
  error ='';

  direccionConfirmada: any;
  direccionSeleccionadaId?: number | null = null;
  //guardarDireccionNueva = false;

  stripe!: Stripe;
  elements!: StripeElements;
  cardElement: any;

  constructor(
    private backetService: BasketService,
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private direccionService: DireccionService,
    private pagoService: PagoService,
    private router: Router,
    private spinner: SpinnerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.backetService.items$.subscribe(items => {
      this.items = items;
      this.total = this.backetService.getTotal();
    });

    this.formularioEnvio = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      provincia: ['', Validators.required],
      telefono: ['', Validators.required],
      guardarDireccionNueva: [false],
    });

    this.direccionService.obtener().subscribe(d => {
      this.direcciones = d;

      const principal = d.find(d => d.principal);
      if (principal) {
        setTimeout(() => {
        this.usarDireccion(principal.id!);
        //this.direccionSeleccionadaId = principal.id!;
        //this.formularioEnvio.patchValue(principal);
        });
      }
    });
  }




  continuar(): void {
    if (this.formularioEnvio.invalid) {
      this.formularioEnvio.markAllAsTouched();
      return;
    }
    this.direccionConfirmada = {...this.formularioEnvio.value};
    this.step = 'confirmacion';

    this.inicializarStripe();
  }

  confirmarCompra(): void {
  console.log('Iniciando confirmarCompra');
  console.log('Token:', localStorage.getItem('token'));

  this.cargando = true;
  this.error = '';
  this.spinner.show();

  const formValue = this.formularioEnvio.value;

  const guardarDireccionNueva = formValue.guardarDireccionNueva;

  const direccionEnvio: Direccion = {
    nombre: formValue.nombre,
    apellidos: formValue.apellidos,
    direccion: formValue.direccion,
    ciudad: formValue.ciudad,
    codigoPostal: formValue.codigoPostal,
    provincia: formValue.provincia,
    telefono: formValue.telefono,
    principal: false
  };

  const guardarDireccion$ =
    guardarDireccionNueva && this.direccionSeleccionadaId === null
      ? this.direccionService.guardar(direccionEnvio).pipe(map(() => void 0))
      : of(void 0);

    guardarDireccion$.subscribe({
    next: () => {
      this.backetService.syncWithBackend().subscribe({
        next: () => {
          this.pedidoService.checkout(direccionEnvio).subscribe({
            next: () => {
              this.backetService.clear();
              this.spinner.hide();
              this.router.navigate(['/checkout/exito']);
            },
            error: () => {
              this.error = 'Error al procesar el pedido';
              this.cargando = false;
              this.spinner.hide();
            }
          });
        },
        error: () => {
          this.error = 'Error sincronizando la cesta';
          this.spinner.hide();
        }
      });
    },
    error: () => {
      this.error = 'Error al guardar la dirección';
      this.cargando = false;
      this.spinner.hide();
    }
  });
}

  direcciones: Direccion[] = [];

  usarDireccion(id: number | null) {
    if(id === null) {
      this.direccionSeleccionadaId = null;
      this.formularioEnvio.reset({guardarDireccionNueva: false});
      return;
    }
    const dir = this.direcciones.find(d => d.id === +id);
    if(dir) {
      this.direccionSeleccionadaId = dir.id!;
      this.formularioEnvio.patchValue({
        nombre: dir.nombre,
        apellidos: dir.apellidos,
        direccion: dir.direccion,
        ciudad: dir.ciudad,
        codigoPostal: dir.codigoPostal,
        provincia: dir.provincia,
        telefono: dir.telefono,
        guardarDireccionNueva: false
      });
      this.cdr.detectChanges();
    }
  }

  confirmarPago() {
    console.log('Confirmar pago: llamando backend');

    this.pagoService.crearPaymentIntent().subscribe({
      next: async (res) => {
        console.log('Respuesta backend: ', res);

        if (!res || !res.clientSecret) {
          console.error('clientSecret NO Recibido');
          return
        }
      const result = await this.stripe.confirmCardPayment(
        res.clientSecret,
        {
          payment_method: {
            card: this.cardElement
          }
        }
      );

      console.log('Resultado Stripe:', result);

      if (result.error)  {
        console.error('Error en el pago: ', result.error.message);
        this.error = result.error.message || 'Error en el pago';
      } else if (result.paymentIntent?.status === 'succeeded') {
          console.log('Pago realizado correctamente');
          this.router.navigate(['/checkout/exito']);
        }
      },
      error: err => {
        console.error('Error backend: ', err);
      }
    });
  }

  async inicializarStripe() {
    if (this.stripe) return;

    this.stripe = await loadStripe(
      'pk_test_**************'
    ) as Stripe;

    this.elements = this.stripe.elements();
    this.cardElement = this.elements.create('card');

    setTimeout(() => {
      this.cardElement.mount('#card-element');
    });
  }
}




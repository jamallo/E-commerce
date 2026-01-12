import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BasketItem } from '../../shared/basket/basket.model';
import { BasketService } from '../../shared/basket/basket';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PedidoService } from '../../shared/pedido/pedido.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../../shared/spinner/spinner.service';
import { Direccion } from '../../shared/direccion/direccion.model';
import { DireccionService } from '../perfil/perfil-direcciones/direccion.service';

type CheckoutStep = 'direccion' | 'confirmacion';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})


export class CheckoutComponent implements OnInit {

  step: CheckoutStep = 'direccion';


  items: BasketItem[] = [];
  total = 0;

  formularioEnvio!: FormGroup;
  cargando = false;
  error ='';

  direccionConfirmada: any;

  constructor(
    private backetService: BasketService,
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private direccionService: DireccionService,
    private router: Router,
    private spinner: SpinnerService
  ) {}

  ngOnInit(): void {
    this.backetService.items$.subscribe(items => {
      this.items = items;
      this.total = this.backetService.getTotal();
    });

    this.formularioEnvio = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      provincia: ['', Validators.required],
      telefono: ['', Validators.required],
    });

    this.direccionService.obtener().subscribe(d => {
      this.direcciones = d;
    });

    this.direccionService.guardar(this.direccionConfirmada).subscribe();
  }




  continuar(): void {
    if (this.formularioEnvio.invalid) {
      this.formularioEnvio.markAllAsTouched();
      return;
    }
    this.direccionConfirmada = this.formularioEnvio.value;
    this.step = 'confirmacion';
  }

  confirmarCompra(): void {
    console.log('Iniciando confirmaCompra en checkout.ts');
    console.log('Token en localStorage:', localStorage.getItem('token'));
    /* if (this.formularioEnvio.invalid) {
      this.formularioEnvio.markAllAsTouched();
      return;
    } */

    this.cargando = true;
    this.error = '';
    this.spinner.show();

    const datosEnvio = this.formularioEnvio.value;

    this.backetService.syncWithBackend().subscribe({
      next: (response) => {
        console.log('Sync exitoso: ', response);
        this.pedidoService.checkout(datosEnvio).subscribe({
          next: (pedidoResponse) => {
            console.log('Checkout exitoso: ', pedidoResponse);
            this.backetService.clear();
            this.spinner.hide();

            setTimeout(() => {
              this.router.navigate(['/checkout/exito']);
            }, 300);
          },
          error: (error) => {
            console.error('Error en checkout: ', error);
            this.error = 'Error al procesar el pedido';
            this.cargando = false;
            this.spinner.hide();
          }
        });
      },
      error: (errors) => {
        console.error('Error en sync: ', errors);
        this.error = 'Error sincronizando la cesta';
        this.spinner.hide();
      }
    });
  }

  direcciones: Direccion[] = [];

  usarDireccion(id: string) {
    const dir = this.direcciones.find(d => d.id === +id);
    if(dir) {
      this.formularioEnvio.patchValue(dir);
    }
  }
}

/* confirmarCompra(): void {
  if (this.formularioEnvio.invalid) {
    this.formularioEnvio.markAllAsTouched();
    return;
  }
  this.cargando = true;

  const direccionEnvio = this.formularioEnvio.value;

  this.pedidoService.checkout({
    direccion: direccionEnvio
  }).subscribe({
    next: () => {
      this.backetService.clear();
      this.router.navigate(['/checkout/exito']);
    },
    error: () => {
      this.error = 'Error al procesar pedido';
      this.cargando = false;
    }
  });
  } */


  /* const datosEnvio = this.formularioEnvio.value;

  console.log('Datos de envío: ', datosEnvio);

  //TODO: guardar dirección, crear pedido, ir al pago
} */


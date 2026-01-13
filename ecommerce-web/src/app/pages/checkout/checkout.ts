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
//import { switchMap } from 'rxjs/operators';

type CheckoutStep = 'direccion' | 'confirmacion';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
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
  direccionSeleccionadaId?: number | null = null;
  //guardarDireccionNueva = false;

  constructor(
    private backetService: BasketService,
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private direccionService: DireccionService,
    private router: Router,
    private spinner: SpinnerService,
    private cdr: ChangeDetectorRef
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

    //this.direccionService.guardar(this.direccionConfirmada).subscribe();
  }




  continuar(): void {
    if (this.formularioEnvio.invalid) {
      this.formularioEnvio.markAllAsTouched();
      return;
    }
    this.direccionConfirmada = {...this.formularioEnvio.value};
    this.step = 'confirmacion';
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


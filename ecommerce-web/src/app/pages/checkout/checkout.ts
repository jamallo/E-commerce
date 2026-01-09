import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BasketItem } from '../../shared/basket/basket.model';
import { BasketService } from '../../shared/basket/basket';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PedidoService } from '../../shared/pedido/pedido.service';
import { Router } from '@angular/router';

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
    private router: Router
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
      telefono: ['', Validators.required],
    });
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
    this.cargando = true;
    this.error = '';

    this.pedidoService.checkout({
      direccion: this.direccionConfirmada
    }).subscribe({
      next: () => {
        this.backetService.clear();
        this.router.navigate(['/checkout/exito']);
      },
      error: () => {
        this.error = 'Error al procesar el pedido';
        this.cargando = false;
      }
    });
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


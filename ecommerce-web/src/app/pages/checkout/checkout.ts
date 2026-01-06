import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BasketItem } from '../../shared/basket/basket.model';
import { BasketService } from '../../shared/basket/basket';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class CheckoutComponet implements OnInit {

  items: BasketItem[] = [];
  total = 0;

  formularioEnvio!: FormGroup;

  constructor(
    private backetService: BasketService,
    private fb: FormBuilder
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

    const datosEnvio = this.formularioEnvio.value;

    console.log('Datos de envío: ', datosEnvio);

    //TODO: guardar dirección, crear pedido, ir al pago
  }

}

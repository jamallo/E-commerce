import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Producto } from '../producto.model';
import { BasketService } from '../../../shared/basket/basket';
import { NotificationService } from '../../notification/service';

@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-producto.html',
  styleUrl: './tarjeta-producto.css',
})
export class TarjetaProductoComponent {


  @Input() producto!: Producto;

  @Input() skeleton = false;

  animando = false;
  textoBoton = 'Añadir a la cesta';

  constructor(
    private basketService: BasketService,
    private notificationService: NotificationService
  ) {}

  aniadirACesta(): void {
    this.basketService.add(this.producto);
    this.notificationService.success('Producto añadido a la cesta');

    this.animando = true;
    this.textoBoton = 'Añadido ✓'

    setTimeout(() => {
      this.animando = false;
      this.textoBoton = 'Añadir a la cesta';
    }, 800);
  }
}

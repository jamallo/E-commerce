import { Component, Input } from '@angular/core';
import { Producto } from '../producto.model';
import { BasketService } from '../../../shared/basket/basket';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCardComponent {

  @Input({required: true}) producto!: Producto;

  constructor(private basket: BasketService) {}

  addToBasket(): void {
    this.basket.add(this.producto);
  }

}

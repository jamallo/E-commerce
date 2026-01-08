import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasketItem } from '../../basket/basket.model';
import { BasketService } from '../../basket/basket';

@Component({
  selector: 'app-mini-cesta',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mini-cesta.component.html',
  styleUrl: './mini-cesta.component.css',
})
export class MiniCestaComponent {

  items: BasketItem[] = [];
  total = 0;

  @Output() cerrar = new EventEmitter<void>();

  constructor(private basketService: BasketService) {
    this.basketService.items$.subscribe(items => {
      this.items = items.slice(-3).reverse();
      this.total = this.basketService.getTotal();
    });
  }

  cerrarPanel(): void {
    this.cerrar.emit();
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { BasketItem } from './basket.model';
import { Producto } from '../../core/productos/producto.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {

  private itemsSubject = new BehaviorSubject<BasketItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  //productoAniadido$ = new Subject<void>();

  private productoAniadidoSubject = new Subject<void>();
  productoAniadido$ = this.productoAniadidoSubject.asObservable();

  constructor() {
    const stored = localStorage.getItem('basket');
    if (stored) {
      this.itemsSubject.next(JSON.parse(stored) as BasketItem[]);
    }
  }

  add(product: Producto): void {
    const items = [...this.itemsSubject.value];
    const existing = items.find(i => i.product.id === product.id);

    if (existing) {
      existing.quantity++;
    } else {
      items.push({product, quantity: 1});
    }

    this.update(items);

    this.productoAniadidoSubject.next();
  }

  decrease(productId: number): void {
    const items = [...this.itemsSubject.value];
    const item = items.find( i => i.product.id === productId);

    if (!item) return;

      item.quantity--;
      if (item.quantity <= 0) {
        this.remove(productId);
        return;
      }

      this.update(items);
  }

  remove(productId: number): void {
    const items = this.itemsSubject.value.filter( i => i.product.id !== productId);
    this.update(items);
  }

  clear(): void {
    this.update([]);
  }

  getTotal(): number {
    return this.itemsSubject.value.reduce(
      (total, item) => total + item.product.precio * item.quantity,
      0
    );
  }

  private update(items: BasketItem[]): void {
    this.itemsSubject.next(items);
    localStorage.setItem('basket', JSON.stringify(items));
  }
}


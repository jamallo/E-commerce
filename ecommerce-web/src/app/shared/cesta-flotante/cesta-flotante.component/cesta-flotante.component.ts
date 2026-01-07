import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasketService } from '../../basket/basket';

@Component({
  selector: 'app-cesta-flotante',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cesta-flotante.component.html',
  styleUrl: './cesta-flotante.component.css',
})
export class CestaFlotanteComponent implements OnInit {

  totalItems = 0;
  animar = false;

  constructor(private bascketService: BasketService) {}

  ngOnInit(): void {
    this.bascketService.items$.subscribe(items => {
      this.totalItems = items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    });

    this.bascketService.productoAniadido$.subscribe(() => {
      this.animar = true;
      setTimeout(() => this.animar = false, 400);
    });
  }

}

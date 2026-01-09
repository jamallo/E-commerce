import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
//import { RouterLink } from '@angular/router';
import { BasketService } from '../../basket/basket';
import { MiniCestaComponent } from '../../mini-cesta/mini-cesta.component/mini-cesta.component';

@Component({
  selector: 'app-cesta-flotante',
  standalone: true,
  imports: [CommonModule, MiniCestaComponent], //RouterLink,
  templateUrl: './cesta-flotante.component.html',
  styleUrl: './cesta-flotante.component.css',
})
export class CestaFlotanteComponent implements OnInit {

  totalItems = 0;
  animar = false;
  mostrarMiniCesta = false;

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

  toggleMiniCesta(): void {
    this.mostrarMiniCesta = !this.mostrarMiniCesta;
  }

}

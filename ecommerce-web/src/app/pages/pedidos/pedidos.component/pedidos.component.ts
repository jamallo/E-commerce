import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PedidoHistoriaDTO } from '../../../shared/pedido/pedido.model';
import { PedidoService } from '../../../shared/pedido/pedido.service';
import { Router, RouterLink } from "@angular/router";
import { BasketService } from '../../../shared/basket/basket';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent implements OnInit {

  pedidos: PedidoHistoriaDTO[] = [];
  cargando = true;

  constructor(
    private pedidoService: PedidoService,
    private basketService: BasketService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.pedidoService.getMisPedidos().subscribe({
      next: pedidos => {
        this.pedidos = pedidos;
        this.cargando = false;
      }
    })
  }

  repetirPedido(id: number) {
    this.pedidoService.repetirPedido(id).subscribe(items => {
      this.basketService.cargarDesdePedido(items);
      this.router.navigate(['/cesta']);
    })
  }

}

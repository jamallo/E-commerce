import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PedidoDetalle } from '../../../shared/pedido/pedido.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../../../shared/pedido/pedido.service';
import { PedidosComponent } from '../pedidos.component/pedidos.component';
import { BasketService } from '../../../shared/basket/basket';

@Component({
  selector: 'app-pedido-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido-detalle.component.html',
  styleUrl: './pedido-detalle.component.css',
})
export class PedidoDetalleComponent implements OnInit {

  pedido?: PedidoDetalle;

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private basketService: BasketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pedidoService.obtenerDetalle(id).subscribe(p => this.pedido = p);
  }

  repetirPedido(id: number) {
    this.pedidoService.repetirPedido(id).subscribe(items => {
      this.basketService.cargarDesdePedido(items);
      this.router.navigate(['/cesta']);
    })
  }

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PedidoDetalle } from '../../../shared/pedido/pedido.model';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../../shared/pedido/pedido.service';

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
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pedidoService.obtenerDetalle(id).subscribe(p => this.pedido = p);
  }

}

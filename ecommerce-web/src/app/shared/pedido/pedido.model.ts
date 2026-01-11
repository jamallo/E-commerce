//import { Injectable } from '@angular/core';
import { BasketItem } from '../basket/basket.model';


export interface DireccionEnvio {
  nombre: string;
  apellidos: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  telefono: string;
}

export interface Pedido {
  items: BasketItem[];
  direccion: DireccionEnvio;
  total: number;
  fecha?: Date;
}

export interface PedidoHistoriaDTO {
  id: number;
  fecha: string;
  total: number;
  estado: string;
}

export interface PedidoItem {
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface PedidoDetalle {
  id: number;
  fecha: string;
  estado: string;
  total: number;
  items: PedidoItem[];
}

/* @Injectable({
  providedIn: 'root',
})
export class PedidoService {
  crearPedido(pedido: Pedido): void {
  //TODO
  console.log('Pedido creado: ' + pedido)
    }
} */

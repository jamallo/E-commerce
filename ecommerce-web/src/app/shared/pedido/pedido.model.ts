import { Injectable } from '@angular/core';
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

/* @Injectable({
  providedIn: 'root',
})
export class PedidoService {
  crearPedido(pedido: Pedido): void {
  //TODO
  console.log('Pedido creado: ' + pedido)
    }
} */

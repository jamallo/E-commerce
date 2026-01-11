import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DireccionEnvio } from './pedido.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {

  private apiUrl = 'http://localhost:8081/api/pedidos';

  constructor(private http: HttpClient) {}

  checkout(dto: DireccionEnvio) {
    return this.http.post(`${this.apiUrl}/checkout`, dto);
  }

}

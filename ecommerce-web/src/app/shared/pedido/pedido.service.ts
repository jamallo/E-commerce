import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {

  private apiUrl = '/api/pedidos';

  constructor(private http: HttpClient) {}

  checkout(data: {direccion: any}): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/checkout`, data);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Direccion } from '../../../shared/direccion/direccion.model';

@Injectable({
  providedIn: 'root',
})
export class DireccionService {

  private api = "http://localhost:8081/api/direcciones";

  constructor(private http: HttpClient) {}

  obtener() {
    return this.http.get<Direccion[]>(this.api);
  }

  guardar(direccion: Direccion) {
    return this.http.post<Direccion>(this.api, direccion);
  }

}

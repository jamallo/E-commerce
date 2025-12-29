import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Producto } from "../productos/producto.model";


@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  private API_URL = 'http://localhost:8081/api/productos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.API_URL);

  }
}

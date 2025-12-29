import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Producto } from "../productos/producto.model";
import { PaginaResponseDTO } from "./pagina-response.dto";


@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  private API_URL = 'http://localhost:8081/api/productos';

  constructor(private http: HttpClient) {}

  listarPaginado(
    page = 0,
    size = 10,
    sortBy = 'id'
  ){
    return this.http.get<PaginaResponseDTO<Producto>>(
      `${this.API_URL}?page=${page}&size=${size}&sortBy=${sortBy}`
    );

  }
}

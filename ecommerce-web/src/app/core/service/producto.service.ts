import { HttpClient, HttpParams } from "@angular/common/http";
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

  crear(producto: any) {
    return this.http.post(`${this.API_URL}`, producto);
  }

  obtenerPorId(id: number) : Observable<Producto> {
    return this.http.get<Producto>(`${this.API_URL}/${id}`);
  }

  actualizar(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.API_URL}/${id}`, producto);
  }

  listarPaginado(
    page: number = 0,
    size: number = 10,
    filtros?: {
      nombre?: string;
      activo?: boolean;
      precioMin?: number;
      precioMax?: number;
    },
    sortBy: string = '',
    direccion: string = ''
  ){
    let params = new HttpParams().set('page', page).set('size', size).set('sortBy', 'id');

    if (filtros?.nombre) {
      params = params.set('nombre', filtros.nombre);
    }

    if (filtros?.activo !== undefined) {
      params = params.set('activo', filtros.activo);
    }

    if (filtros?.precioMin !== undefined) {
      params = params.set('precioMin', filtros.precioMin);
    }

    if (filtros?.precioMax !== undefined) {
      params = params.set('precioMax', filtros.precioMax);
    }

    return this.http.get<PaginaResponseDTO<Producto>>(
      this.API_URL, { params }
    );

  }
}

import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Producto } from "../producto.model";
import { ProductoService } from "../../service/producto.service";


@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})

export class ProductoListComponent implements OnInit {

  trackById(index: number, producto: Producto) {
    return producto.id;
  }

  productos: Producto[] = [];
  cargando = true;

  totalPaginas = 0;
  totalElementos = 0;
  paginaActual= 0;

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productoService.listarPaginado().subscribe({
      next: (response) => {
        console.log('Productos recibidos: ', response);
        console.log(Array.isArray(this.productos));
        this.productos = response.contenido;
        this.totalPaginas = response.totalPaginas;
        this.totalElementos = response.totalElementos;
        this.paginaActual = response.paginaActual;
        this.cargando = false;
        console.log(Array.isArray(this.productos));
      },
      error: (err) => {
        console.error('ERROR cargando productos: ', err);
        this.cargando = false;
      }
    });
  }
}

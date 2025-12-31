import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Producto } from "../producto.model";
import { ProductoService } from "../../service/producto.service";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})

export class ProductoListComponent implements OnInit {


  productos: Producto[] = [];
  cargando = true;

  //Variables de ordenación
  totalPaginas = 0;
  totalElementos = 0;
  paginaActual= 0;
  tamanioPaginas = 10;
  sortBy = "id";
  direccion = 'ASC';

  filtros = {
    nombre: '',
    activo: undefined as boolean | undefined,
    precioMin: undefined as number | undefined,
    precioMax: undefined as number | undefined,
  };

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProdutos();
  }

  paginaSiguiente(): void {
    if(this.paginaActual < this.totalPaginas -1) {
      this.paginaActual++;
      this.cargarProdutos();
    }
  }

  paginaAnterior(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
      this.cargarProdutos();
    }
  }

  aplicarFiltros(): void {
    this.paginaActual = 0;
    this.cargarProdutos();
  }

  private filtrosIniciales() {
    return {
      nombre: '',
      activo: undefined,
      precioMin: undefined,
      precioMax: undefined
    };
  }

  limpiarFiltros(): void {
    this.filtros = this.filtrosIniciales();
    this.sortBy = 'id';
    this.direccion = 'ASC';
    this.paginaActual = 0;
    this.cargarProdutos();
  }

  cargarProdutos(): void {
    this.cargando = true;

    this.productoService
    .listarPaginado(
      this.paginaActual,
      this.tamanioPaginas,
      this.filtros,
      this.sortBy,
      this.direccion)
    .subscribe({
      next: (response) => {
        console.log('Productos recibidos: ', response);

        this.productos = response.contenido;
        this.totalPaginas = response.totalPaginas;
        this.totalElementos = response.totalElementos;
        this.paginaActual = response.paginaActual;
        this.tamanioPaginas = response.tamanioPaginas;

        this.cargando = false;
      },
      error: (err) => {
        console.error('ERROR cargando productos: ', err);
        this.cargando = false;
      }
    });
  }

  trackById(index: number, producto: Producto) {
    return producto.id;
  }

}

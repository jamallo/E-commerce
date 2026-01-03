import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Producto } from "../producto.model";
import { ProductoService } from "../../service/producto.service";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../../auth/auth.service";
import { finalize } from "rxjs";
import { NotificationService } from "../../notification/service";


@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})

export class ProductoListComponent implements OnInit {


  productos: Producto[] = [];
  cargando = false;



  //Variables de ordenación
  totalPaginas = 0;
  totalElementos = 0;
  paginaActual= 0;
  tamanioPaginas = 10;
  sortBy = "id";
  direccion = 'ASC';

  mensaje = '';
  error = '';


  filtros = {
    nombre: '',
    activo: undefined as boolean | undefined,
    precioMin: undefined as number | undefined,
    precioMax: undefined as number | undefined,
  };

  productoAEliminar ?: number | null = null;
  mostrarConfirmacion = false;
  eliminando = false;


  constructor(
    private productoService: ProductoService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef) {}

  get esAdmin(): boolean {
    return this.authService.isAdmin();
  }


  ngOnInit(): void {
    console.log('ngOnInit ejecutado')
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
    console.log('Cargando productos...', {
      pagina: this.paginaActual,
      filtros: this.filtros
    });
    this.cargando = true;
    this.error = '';

    this.productoService
    .listarPaginado(
      this.paginaActual,
      this.tamanioPaginas,
      this.filtros,
      this.sortBy,
      this.direccion
      )
      .pipe(
        finalize(() => {
        this.cargando = false;
        this.cdr.detectChanges();
      }))
          .subscribe({
          next: (response) => {
            console.log('Productos recibidos: ', response);

            this.productos = response.contenido || [];
            this.totalPaginas = response.totalPaginas || 0;
            this.totalElementos = response.totalElementos || 0;
            this.paginaActual = response.paginaActual || 0;
            this.tamanioPaginas = response.tamanioPaginas || 10;
            console.log('Estado despues de carga: ', {
              producto:this.productos.length,
              totalPaginas: this.totalPaginas
            });
      },
      error: (err) => {
        console.error('ERROR cargando productos: ', err);
        this.error = 'Error cargando productos';
      }
    });
  }



  pedirConfirmacion(id: number): void{
    this.productoAEliminar = id;
    this.mostrarConfirmacion = true;
  }

  cancelarEliminar(): void {
    this.productoAEliminar = null;
    this.mostrarConfirmacion = false;
    this.eliminando = false;
  }

  eliminarConfirmado() {
    if (!this.productoAEliminar) return;

    const id = this.productoAEliminar;

    this.eliminando = true;

    this.productoService.eliminar(id)
    .pipe(
      finalize(() => {
        this.eliminando = false;
        this.mostrarConfirmacion = false;
        this.productoAEliminar = null;
        this.cargarProdutos();
        this.cdr.detectChanges();
      })
    )
    .subscribe({
      next: () => {
        this.notificationService.success('Producto eliminado correctamente');
        this.cargarProdutos();
        this.cdr.detectChanges();
      },
      error: () => {
        this.notificationService.error('Error al eliminar el producto')
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  trackById(index: number, producto: Producto): number {
    return producto.id;
  }

}


        /* eliminar(id: number): void {

          this.productoService.eliminar(id).subscribe({
            next: () => {
              this.mensaje = 'Producto eliminado correctamente';
              this.cargarProdutos();
              setTimeout(() => this.mensaje = '', 3000);
            },
            error: err => {
              this.error = 'Error al eliminar el producto';
              console.error(err);
            }
          });
        } */

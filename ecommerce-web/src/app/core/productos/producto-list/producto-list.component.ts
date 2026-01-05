import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit, AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { Producto } from "../producto.model";
import { ProductoService } from "../../service/producto.service";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../../auth/auth.service";
import { finalize } from "rxjs";
import { NotificationService } from "../../notification/service";
import { ConfirmService } from "../../ui/confirm-modal/confirm";
import { HasRoleDirective } from "../../directives/has-role";
import { ProductCardComponent } from "../product-card/product-card";
import { TarjetaProductoComponent } from "../tarjeta-producto/tarjeta-producto";


@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HasRoleDirective, TarjetaProductoComponent], 
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})

export class ProductoListComponent implements OnInit, AfterViewInit {

  @ViewChild('sentinelaScroll') sentinelaScroll!: ElementRef;


  productos: Producto[] = [];
  cargando = false;



  //Variables de ordenación
  totalPaginas = 0;
  totalElementos = 0;
  paginaActual= 0;
  tamanioPaginas = 10;

  mensaje = '';
  //error = '';


  filtros = {
    nombre: '',
    activo: undefined as boolean | undefined,
    precioMin: undefined as number | undefined,
    precioMax: undefined as number | undefined,
  };
  sortBy = "id";
  direccion = 'ASC';
  hayMasProductos = true;

  /* productoAEliminar ?: number | null = null;
  mostrarConfirmacion = false;
  eliminando = false; */


  constructor(
    private productoService: ProductoService,
    //private authService: AuthService,
    private notificationService: NotificationService,
    private confirmService: ConfirmService
    //private cdr: ChangeDetectorRef
    )
    {}

  /* get esAdmin(): boolean {
    return this.authService.isAdmin();
  } */


  ngOnInit(): void {
    console.log('ngOnInit ejecutado')
    this.cargarProdutos();
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(entries => {
      if (
        entries[0].isIntersecting &&
        !this.cargando &&
        this.hayMasProductos
      ) {
        this.cargarMasProductos();

      }
    });

    observer.observe(this.sentinelaScroll.nativeElement);
  }

  cargarMasProductos(): void {
    if (this.paginaActual >= this.totalPaginas -1) {
      this.hayMasProductos = false;
      return;
    }

    this.paginaActual++;
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
    //this.cargando = true;
    //this.error = '';

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
        //this.cdr.detectChanges();
      }))
          .subscribe({
          next: (response) => {
            console.log('Productos recibidos: ', response);

            this.productos = [...this.productos, ...response.contenido];
            this.hayMasProductos = this.paginaActual < this.totalPaginas -1;
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
        //this.error = 'Error cargando productos';
        this.hayMasProductos = false;
      }
    });
  }



  /* pedirConfirmacion(id: number): void{
    this.productoAEliminar = id;
    this.mostrarConfirmacion = true;
  } */

  pedirConfirmacion(id: number): void {
    this.confirmService.confirm({
      title: 'Eliminar producto',
      message: '¿Seguro que deseas eliminar este producto?',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar'
    }).subscribe(confirmado => {
      if (confirmado) {
        this.eliminarProducto(id);
      }
    });
  }

  eliminarProducto(id: number): void {
    this.productoService.eliminar(id).subscribe({
      next: () => this.notificationService.success('Producto eliminado'),
      error: () => this.notificationService.error('Error al eliminar')
    });
  }

  /* cancelarEliminar(): void {
    this.productoAEliminar = null;
    this.mostrarConfirmacion = false;
    this.eliminando = false;
  } */

   /* eliminarConfirmado() {
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
        this.cdr.detectChanges();
      },
      error: () => {
        this.notificationService.error('Error al eliminar el producto')
      }
    });
  } */

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

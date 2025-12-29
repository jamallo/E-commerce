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

  productos: Producto[] = [];
  cargando = true;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.listar().subscribe({
      next: data => {
        console.log('Productos recibidos: ', data);
        this.productos = data;
        this.cargando = false;
      },
      error: err => {
        console.error('ERROR cargando productos: ', err);
        this.cargando = false;
      }
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DireccionService } from '../perfil-direcciones/direccion.service';
import { Direccion } from '../../../shared/direccion/direccion.model';

@Component({
  selector: 'app-perfil-direcciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-direcciones.component.html',
  styleUrl: './perfil-direcciones.component.css',
})
export class PerfilDireccionesComponent implements OnInit{

  direcciones: Direccion[] = [];

  constructor (private service: DireccionService) {}

  ngOnInit(): void {
    this.service.obtener().subscribe(d => this.direcciones = d);
  }

}

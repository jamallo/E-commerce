import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-datos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-datos.component.html',
  styleUrl: './perfil-datos.component.css',
})
export class PerfilDatosComponent implements OnInit{

  email?: string | null;


  constructor(private authservice: AuthService) {}

  ngOnInit(): void {
    this.email = this.authservice.getEmail();
  }





}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  contrasenia = '';
  error = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.contrasenia)
    .subscribe({
      next: () => {
        alert('Login correcto');
      },
      error: () => {
        alert ('Credenciales incorrectas');
      }
    });

  }


}

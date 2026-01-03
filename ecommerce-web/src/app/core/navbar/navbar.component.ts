import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../auth/auth.service";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  isLogged(): boolean {
    return this.authService.isLogged();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  goPrueba() {
    this.router.navigate(['/prueba']);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  goAdmin(): void {
    this.router.navigate(['/admin']);
  }
}


/* template: `
  <nav style="padding: 10px; background: #eee">
    @if (!isLogged()) {
      <button (click)="goLogin()">Login</button>
    }

    @if (isLogged()) {
      <button (click)="goPrueba()">Prueba</button>
      <button (click)="logout()">Deslogarse</button>
    }

    @if (isLogged() && isAdmin()) {
      <button (click)="goAdmin()"> Admin </button>
    }
  </nav>
  ` */

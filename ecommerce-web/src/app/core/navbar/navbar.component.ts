import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { HasRoleDirective } from "../directives/has-role";
import { BasketService } from "../../shared/basket/basket";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, HasRoleDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  totalCesta = 0;

  constructor(
    private authService: AuthService,
    private basketService: BasketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.basketService.items$.subscribe(items => {
      this.totalCesta = items.reduce(
        (total, items) => total + items.quantity,
        0
      );
    });
  }

  get isLogged(): boolean {
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


  goAdmin(): void {
    this.router.navigate(['/admin']);
  }
}

/* get esAdmin(): boolean {
  return this.authService.isAdmin();
} */

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

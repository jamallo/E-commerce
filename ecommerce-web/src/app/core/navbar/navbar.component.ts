import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { HasRoleDirective } from "../directives/has-role";
import { BasketService } from "../../shared/basket/basket";
import { Subscription } from "rxjs";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HasRoleDirective,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy{

  totalCesta = 0;
  userEmail: string = '';
  private backetSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private basketService: BasketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.backetSubscription = this.basketService.items$.subscribe(items => {
      this.totalCesta = items.reduce(
        (total, items) => total + items.quantity,
        0
      );
    });
    const userEmail = this.authService.getEmail();
  }

  ngOnDestroy(): void {
    if (this.backetSubscription) {
      this.backetSubscription.unsubscribe();
    }
  }

  get isLogged(): boolean {
    return this.authService.isLogged();
  }

  getUserInitials(): string {
    if (this.userEmail) {
      return this.userEmail.charAt(0).toUpperCase();
    }
    return 'U';
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

   isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  // Opcional: método para obtener roles
  getRoles(): string[] {
    return this.authService.getRoles();
  }
}


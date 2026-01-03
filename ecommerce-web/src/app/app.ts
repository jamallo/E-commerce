import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { NotificationComponent } from "./core/notification/notification";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, NotificationComponent],
  template: `
    <app-navbar></app-navbar>
    <app-notification></app-notification>
    <router-outlet></router-outlet>`,
  standalone: true
})
export class App {
  protected readonly title = signal('ecommerce-web');
}

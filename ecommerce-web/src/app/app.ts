import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { NotificationComponent } from "./core/notification/notification";
import { SpinnerComponent } from './shared/spinner/spinner';
import { ConfirmModalComponent } from './core/ui/confirm-modal/confirm-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, NotificationComponent, SpinnerComponent, ConfirmModalComponent],
  template: `
    <app-navbar></app-navbar>
    <app-spinner></app-spinner>
    <app-notification></app-notification>
    <app-confirm-modal></app-confirm-modal>
    <router-outlet></router-outlet>`,
  standalone: true
})
export class App {
  protected readonly title = signal('ecommerce-web');
}

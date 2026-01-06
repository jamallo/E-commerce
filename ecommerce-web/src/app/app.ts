import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { NotificationComponent } from "./core/notification/notification";
import { SpinnerComponent } from './shared/spinner/spinner';
import { ConfirmModalComponent } from './core/ui/confirm-modal/confirm-modal';
import { ConfirmacionComponent } from './shared/confirmacion/confirmacion';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, NotificationComponent, SpinnerComponent, ConfirmModalComponent, ConfirmacionComponent],
  template: `
    <app-navbar></app-navbar>
    <app-spinner></app-spinner>
    <app-notification></app-notification>
    <app-confirm-modal></app-confirm-modal>
    <router-outlet></router-outlet>
    <app-confirmacion></app-confirmacion>`,
  standalone: true
})
export class App {
  protected readonly title = signal('ecommerce-web');
}

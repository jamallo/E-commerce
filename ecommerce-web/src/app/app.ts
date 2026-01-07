import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { NotificationComponent } from "./core/notification/notification";
import { SpinnerComponent } from './shared/spinner/spinner';
import { ConfirmModalComponent } from './core/ui/confirm-modal/confirm-modal';
import { ConfirmacionComponent } from './shared/confirmacion/confirmacion';
import { FormGroup } from '@angular/forms';
import { CestaFlotanteComponent } from './shared/cesta-flotante/cesta-flotante.component/cesta-flotante.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, NotificationComponent, SpinnerComponent, ConfirmModalComponent, ConfirmacionComponent, CestaFlotanteComponent],
  template: `
    <app-navbar></app-navbar>
    <app-spinner></app-spinner>
    <app-notification></app-notification>
    <app-confirm-modal></app-confirm-modal>
    <router-outlet></router-outlet>
    <app-confirmacion></app-confirmacion>
    <app-cesta-flotante></app-cesta-flotante>`,
  standalone: true
})
export class App {
  protected readonly title = signal('ecommerce-web');
}

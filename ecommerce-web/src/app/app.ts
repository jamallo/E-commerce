import { Component, signal, inject, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NavbarComponent } from './core/navbar/navbar.component';
import { NotificationComponent } from "./core/notification/notification";
import { SpinnerComponent } from './shared/spinner/spinner';
import { ConfirmModalComponent } from './core/ui/confirm-modal/confirm-modal';
import { ConfirmacionComponent } from './shared/confirmacion/confirmacion';
//import { FormGroup } from '@angular/forms';
import { CestaFlotanteComponent } from './shared/cesta-flotante/cesta-flotante.component/cesta-flotante.component';
import { SpinnerService } from './shared/spinner/spinner.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AsyncPipe,
    NavbarComponent,
    NotificationComponent,
    SpinnerComponent,
    ConfirmModalComponent,
    ConfirmacionComponent,
    CestaFlotanteComponent
  ],
  standalone: true,
  template: `
    <app-navbar></app-navbar>

    @if (spinner$ | async) {
    <app-spinner></app-spinner>
    }
    
    <app-notification></app-notification>
    <app-confirm-modal></app-confirm-modal>
    <router-outlet></router-outlet>
    <app-confirmacion></app-confirmacion>
    <app-cesta-flotante></app-cesta-flotante>`
})
export class App {
  protected readonly title = signal('ecommerce-web');

  private spinnerService = inject(SpinnerService);
  spinner$ = this.spinnerService.loading$;
}

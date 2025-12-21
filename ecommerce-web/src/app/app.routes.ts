import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { PruebaComponent } from './prueba/prueba.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login},
  { path: 'prueba', component: PruebaComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full'},

];

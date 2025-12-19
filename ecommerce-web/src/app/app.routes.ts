import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { PruebaComponent } from './prueba/prueba.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'prueba', component: PruebaComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'login', pathMatch: 'full'},

];

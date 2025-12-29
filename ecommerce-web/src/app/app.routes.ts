import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PruebaComponent } from './prueba/prueba.component';
import { authGuard } from './auth/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { roleGuard } from './core/guards/role.guard';
import { ProductoListComponent } from './core/productos/producto-list/producto-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'prueba', component: PruebaComponent, canActivate: [authGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'admin', component: AdminComponent, canActivate: [roleGuard]},
  { path: 'productos', component: ProductoListComponent}
];

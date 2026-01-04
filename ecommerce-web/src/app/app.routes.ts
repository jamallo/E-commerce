import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PruebaComponent } from './prueba/prueba.component';
import { authGuard } from './auth/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { roleGuard } from './core/guards/role.guard';
import { ProductoListComponent } from './core/productos/producto-list/producto-list.component';
import { ProductoForm } from './core/productos/producto-form/producto-form';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'prueba', component: PruebaComponent, canActivate: [authGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'admin', component: AdminComponent, canActivate: [roleGuard], data: {roles: ['ADMIN']}},
  { path: 'productos', component: ProductoListComponent},
  //{ path: 'productos/nuevo', component: ProductoForm, canActivate: [authGuard], data: { role: 'ADMIN' }},
  { path: 'productos/nuevo', component: ProductoForm, canActivate: [roleGuard], data: {roles: ['ADMIN']}},
  { path: 'productos/editar/:id', component: ProductoForm, canActivate: [roleGuard], data: {roles: ['ADMIN']}}
];

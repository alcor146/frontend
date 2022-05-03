import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardsComponent } from './cards/cards.component';
import { CartsComponent } from './carts/carts.component';
import { ClientsComponent } from './clients/clients.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { HasRoleGuard } from './guards/has-role.guard';


import { LocationsComponent } from './locations/locations.component';
import { LoginComponent } from './login/login.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

import { OrdersComponent } from './orders/orders.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: 'products', component: ProductsComponent, canActivate: [AuthGuardGuard]},
  {path: 'products/:id', component: ProductDetailsComponent, canActivate: [AuthGuardGuard]},
  {path: 'cards', component: CardsComponent, canActivate: [AuthGuardGuard]},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuardGuard]},
  {path: 'orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuardGuard]},
  {path: 'locations', component: LocationsComponent, canActivate: [AuthGuardGuard]},
  {path: 'clients', component: ClientsComponent, canActivate: [AuthGuardGuard, HasRoleGuard]},
  {path: "login", component: LoginComponent},
  {path: "carts", component: CartsComponent, canActivate: [AuthGuardGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

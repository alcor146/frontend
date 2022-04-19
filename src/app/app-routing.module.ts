import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardsComponent } from './cards/cards.component';
import { CartsComponent } from './carts/carts.component';
import { ClientsComponent } from './clients/clients.component';

import { LocationsComponent } from './locations/locations.component';
import { LoginComponent } from './login/login.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

import { OrdersComponent } from './orders/orders.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'cards', component: CardsComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'orders/:id', component: OrderDetailsComponent},
  {path: 'locations', component: LocationsComponent},
  {path: 'clients', component: ClientsComponent},
  {path: "login", component: LoginComponent},
  {path: "carts", component: CartsComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

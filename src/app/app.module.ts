import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ConfirmComponent } from './dialogs/products/confirm/confirm.component';
import { CreateComponent } from './dialogs/products/create/create.component';
import { EditComponent } from './dialogs/products/edit/edit.component';
import { PreviewComponent } from './dialogs/products/preview/preview.component';

import { CardCreateComponent } from './dialogs/cards/card-create/card-create.component';
import { CardEditComponent } from './dialogs/cards/card-edit/card-edit.component';
import { CardConfirmComponent } from './dialogs/cards/card-confirm/card-confirm.component';

import { LocationConfirmComponent } from './dialogs/locations/location-confirm/location-confirm.component';
import { LocationCreateComponent } from './dialogs/locations/location-create/location-create.component';
import { LocationEditComponent } from './dialogs/locations/location-edit/location-edit.component';



import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { CardsComponent } from './cards/cards.component';
import { LocationsComponent } from './locations/locations.component';
import { OrderConfirmComponent } from './dialogs/orders/order-confirm/order-confirm.component';
import { OrderCreateComponent } from './dialogs/orders/order-create/order-create.component';
import { OrderEditComponent } from './dialogs/orders/order-edit/order-edit.component';
import { OrderPreviewComponent } from './dialogs/orders/order-preview/order-preview.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientConfirmComponent } from './dialogs/clients/client-confirm/client-confirm.component';
import { ClientCreateComponent } from './dialogs/clients/client-create/client-create.component';
import { ClientEditComponent } from './dialogs/clients/client-edit/client-edit.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartsComponent } from './carts/carts.component';
import { MatSelectModule } from '@angular/material/select';
import { OrderDetailsComponent } from './order-details/order-details.component';





@NgModule({
  declarations: [
    AppComponent,
    ConfirmComponent,
    CreateComponent,
    EditComponent,
    PreviewComponent,
    ProductsComponent,
    OrdersComponent,
    CardsComponent,
    CardConfirmComponent,
    CardCreateComponent,
    CardEditComponent,
    HeaderComponent,
    LocationsComponent,
    LocationConfirmComponent,
    LocationCreateComponent,
    LocationEditComponent,
    OrderConfirmComponent,
    OrderCreateComponent,
    OrderEditComponent,
    OrderPreviewComponent,
    ClientsComponent,
    ClientConfirmComponent,
    ClientCreateComponent,
    ClientEditComponent,
    ProductDetailsComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CartsComponent,
    OrderDetailsComponent,

    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    NgbModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatToolbarModule,
    MatSelectModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

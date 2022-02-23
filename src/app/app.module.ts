import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ConfirmComponent } from './dialogs/products/confirm/confirm.component';
import { CreateComponent } from './dialogs/products/create/create.component';
import { EditComponent } from './dialogs/products/edit/edit.component';
import { PreviewComponent } from './dialogs/products/preview/preview.component';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { CardsComponent } from './cards/cards.component';
import { CardConfirmComponent } from './dialogs/cards/card-confirm/card-confirm.component';
import { CardCreateComponent } from './dialogs/cards/card-create/card-create.component';
import { CardEditComponent } from './dialogs/cards/card-edit/card-edit.component';



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
    CardEditComponent
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
    Ng2SearchPipeModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

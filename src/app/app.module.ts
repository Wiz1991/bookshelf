import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntityDataModule } from '@ngrx/data';
import { HttpClientModule } from '@angular/common/http';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { HeaderComponent } from './components/header/header.component';
import { BookService } from 'src/app/api/book.service';
import { OrderService } from 'src/app/api/order.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

import { UserService } from 'src/app/api/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RateComponent } from './components/rate/rate.component';
@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    OrdersComponent,
    HeaderComponent,
    RateComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [BookService, OrderService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}

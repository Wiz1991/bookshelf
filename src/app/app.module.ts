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
import { UserService } from 'src/app/api/user.service';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    OrdersComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [BookService, OrderService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}

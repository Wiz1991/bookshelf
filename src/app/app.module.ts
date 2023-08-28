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
import { MatIconModule } from '@angular/material/icon';
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
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FilterComponent } from './components/filter/filter.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    OrdersComponent,
    HeaderComponent,
    RateComponent,
    LoginComponent,
    RegisterComponent,
    FilterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule,
    MatSelectModule,
    MatIconModule,
    BrowserAnimationsModule,
  ],
  providers: [BookService, OrderService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}

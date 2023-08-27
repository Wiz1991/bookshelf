import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from 'src/app/pages/catalog/catalog.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { OrdersComponent } from 'src/app/pages/orders/orders.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    component: CatalogComponent,
    path: '',
    pathMatch: 'full',
  },
  {
    component: LoginComponent,
    path: 'login',
  },
  {
    component: RegisterComponent,
    path: 'register',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

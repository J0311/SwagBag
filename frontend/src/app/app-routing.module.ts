import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { DisplayOrdersComponent } from './components/display-orders/display-orders.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminNewProductComponent } from './components/admin-new-product/admin-new-product.component';
import { AdminEditProductComponent } from './components/admin-edit-product/admin-edit-product.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AuthGuard } from './guards/auth.guard';
import { IsSignedInGuard } from './guards/is-signed-in.guard';
import { IsCustomerGuard } from './guards/is-customer.guard';
import { IsAdminGuard } from './guards/is-admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [IsSignedInGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'home',
    component: DisplayProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard, IsCustomerGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard, IsCustomerGuard],
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orders',
    component: DisplayOrdersComponent,
    canActivate: [AuthGuard, IsCustomerGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, IsAdminGuard],
  },
  {
    path: 'admin/new-product',
    component: AdminNewProductComponent,
    canActivate: [AuthGuard, IsAdminGuard],
  },
  {
    path: 'admin/edit-product/:id',
    component: AdminEditProductComponent,
    canActivate: [AuthGuard, IsAdminGuard],
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

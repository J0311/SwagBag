import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductReviewComponent } from './components/product-review/product-review.component';
import { DisplayOrdersComponent } from './components/display-orders/display-orders.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProductCardComponent,
    CartComponent,
    CheckoutComponent,
    DisplayProductsComponent,
    ProductDetailsComponent,
    ProductReviewComponent,
    DisplayOrdersComponent,
    OrderCardComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

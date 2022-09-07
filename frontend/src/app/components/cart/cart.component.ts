import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: {
    product: Product;
    quantity: number;
  }[] = [];

  totalPrice: number = 0;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getCart().subscribe((cart) => {
      this.products = cart.products;
      this.totalPrice = cart.totalPrice;
    });
  }

  emptyCart(): void {
    let cart = {
      cartCount: 0,
      products: [],
      totalPrice: 0.0,
    };
    this.productService.setCart(cart);
    this.router.navigate(['/home']);
  }

  /** This removeFromCart() method takes in 2 parameters from the cart.html document.
   * The first parameter is the passedProduct which is defined in models/product.ts
   */
  removeFromCart(passedProduct: Product): void {
    const productToDecrement = this.products.find(
      (product) => product.product.id === passedProduct.id
    );

    if (productToDecrement && productToDecrement.quantity > 1)
      productToDecrement.quantity--;
    else {
      this.products = this.products.filter(
        (product) => product.product.id !== passedProduct.id
      );
    }

    let cart = this.productService.cart;
    if (cart.cartCount > 1) cart.cartCount--;
    else cart.cartCount = 0;

    cart.products = this.products;
    cart.totalPrice = cart.totalPrice - <any>productToDecrement!.product.price;
    this.productService.setCart(cart);
  }

  /** This addToCart() method takes in 2 parameters from the cart.html document.
   * The first parameter is the passedProduct which is defined in models/product.ts
   */
  addToCart(passedProduct: Product) {
    const productToIncrement = this.products.find(
      (product) => product.product.id === passedProduct.id
    );

    let cart = this.productService.cart;

    if (
      productToIncrement &&
      productToIncrement.quantity < productToIncrement.product.quantity
    ) {
      productToIncrement.quantity++;
      cart.cartCount++;
      cart.totalPrice =
        cart.totalPrice + <any>productToIncrement!.product.price;
    }

    cart.products = this.products;
    this.productService.setCart(cart);
  }
}

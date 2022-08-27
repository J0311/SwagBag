import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

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

  totalPrice!: number;
  cartProducts: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getCart().subscribe((cart) => {
      this.products = cart.products;
      this.products.forEach((element) =>
        this.cartProducts.push(element.product)
      );
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
   * The second parameter is the quantity of this particular product inside the cart
   */
  removeFromCart(passedProduct: Product, quantity: number): void {
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
    cart.totalPrice =
      cart.totalPrice - <any>productToDecrement?.product.price ?? 0;
    this.productService.setCart(cart);
  }

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
        cart.totalPrice + <any>productToIncrement?.product.price ?? 0;
    }

    cart.products = this.products;
    this.productService.setCart(cart);
  }
}

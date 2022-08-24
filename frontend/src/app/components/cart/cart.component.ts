import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  //added
  cartCount!: number;

  products: {
    product: Product,
    quantity: number,

  }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];

  //added
  @Input() productInfo!: Product;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getCart().subscribe(
      (cart) => {
        this.products = cart.products;
        this.products.forEach(
          (element) => this.cartProducts.push(element.product)
        );
        this.totalPrice = cart.totalPrice;
      }
    );
  }

  emptyCart(): void {
    let cart = {
      cartCount: 0,
      products: [],
      totalPrice: 0.00
    };
    this.productService.setCart(cart);
    this.router.navigate(['/home']);
  }

  //added
  removeFromCart(Product:id): void {
    console.log(Product);

    /*this.products.forEach(
      (element) => {
        --element.quantity;
        if(element.quantity<1){
          this.products.pop();
        }
      }
    );*/
    --product.quantity;
    if(product.quantity<1){
      this.products = this.products.filter(({product: p}) => p.id !== product.id)
      //this.products=this.products.filter((p:Product) => p.id !== product.id)
    }
  }



}

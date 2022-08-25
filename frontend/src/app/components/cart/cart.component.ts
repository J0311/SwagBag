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
  //add
 /* products: Product[] = [];*/

  totalPrice!: number;
  cartProducts: Product[] = [];

  //added
  @Input() productInfo!: Product;


  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getCart().subscribe(
      (cart) => {
        this.products = cart.products;
        //add

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
 /* removeFromCart(product: Product): void {
    console.log(Product);


    //const newProduct = Object.assign( product, {quantity: product.quantity-1})
    const index = this.products.findIndex(({product:p}) => p.id === product.id)

    let newProduct = {
      product: product,
      quantity: product.quantity--
      //quantity: this.products[index].quantity--
    };


    this.products[index] = newProduct;

    //add
    //product.quantity = newProduct.product.quantity

    if(product.quantity<1){
      this.products.pop();
    }

  }*/


  removeFromCart(product: Product, quantity: number): void {
    //console.log(Product);
    console.log(quantity);



    //const newProduct = Object.assign( product, {quantity: product.quantity-1})
    const index = this.products.findIndex(({product:p}) => p.id === product.id)



      let newProduct = {
        product: product,
        quantity: --quantity
        //quantity: this.products[index].quantity--

      };
    //product.quantity=quantity--;



    this.products[index] = newProduct;
    console.log(quantity);

    //add
    //product.quantity = newProduct.product.quantity


    if(quantity<1){
      this.products.pop();
    }

  }



}

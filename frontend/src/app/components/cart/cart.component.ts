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

  products: {
    product: Product,
    quantity: number,
  }[] = [];

  totalPrice!: number;
  cartProducts: Product[] = [];


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

/** This removeFromCart() method takes in 2 parameters from the cart.html document.
 * The first parameter is the passedProduct which is defined in models/product.ts
 * The second parameter is the quantity of this particular product inside the cart
 */
  removeFromCart(passedProduct: Product, quantity: number): void {


  /**
   * Here we are declaring a constant variable called productToDecrement that cannot be modified.
   * We are finding this variable by using the find() array method,which returns the first element
   * in the provided array that satisfies the given condition passed through it.
   * Which in our case we are passing in the condition to analyze the entire products array in your
   * shopping cart and find the element that has the same id as the one passed (aka which button you
   * click on the cart.html is the product id passed).
   */
    const productToDecrement = this.products.find(product => product.product.id === passedProduct.id);

  /**
   * We are now setting a conditional if statement, that reads, if productToDecrement is truthy meaning
   * it's not null, it should produce a productToDecrement.quantity and execute the if code-block. But if is falsy then this if statement
   * will execute the else code-block instead.
   * The if code-block just states, to decrease the productToDecrement.quantity by 1.
   * The else code-block states, to remove that product from the entire products array.
   *
   */
  if(productToDecrement && productToDecrement.quantity > 1) productToDecrement.quantity--;
    else {
      this.products = this.products.filter(product => product.product.id !== passedProduct.id);
      /**
       * filter out the product ID that MATCHES the ID of the product we passed in...
       * !== ===
       */
    }
  /**
   * here we are declaring the variable, we are setting this equal to the product service
   * cart() method which returns all cart information
   */

  let cart = this.productService.cart

  /**
   * if the cart.cartCount is greater than 1 remove 1 from the cart.cartCount.
   * We are accessing this information by using the product service cart.
   * else set the cart.cartCount to 0.
   */

  if(cart.cartCount > 1) cart.cartCount--;
    else cart.cartCount = 0;

  /**
   * put into the cart products, our products array
   */
  cart.products = this.products;
    // cart.totalPrice = cart.totalPrice - (productToDecrement ? productToDecrement.product.price : 0)
  /**
   * another way to write this is
   *
   * isThisTrue ? doThis : doThat;
   *  if(isThisTrue) {
   *    doThis
   *  }
   *  else {doThat}
   *
   * cart.totalPrice = cart.totalPrice - (productToDecrement ? productToDecrement.product.price : 0)
   *
   */


  /**
   * but we did it this way, the more efficent way
   *
   * couldBeUndefined ?? 0
   *  variable could be undefined... and if so take right side of statement
   */
  cart.totalPrice = cart.totalPrice - <any>productToDecrement?.product.price ?? 0;


  /**
   * finally setting this cart using the product service setCart() method
   */

  this.productService.setCart(cart)




    // const expampleProduct = {
    //   product: {
    //     id: 1,
    //     title:.blue,
    //   },
    //   quantity: 4 -> 3 --> 2 ---> 1 ... 1 REMOVE PRODUCT --> !!!!0
    // }


    // if(quantity<1){
    //   this.products.pop();
    //   //POP :  GETS RID OF LAST ELEMENT IN ARRAY
    // }

  }
}

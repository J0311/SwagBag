import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
@Injectable()
export class NavbarComponent implements OnInit{

  cartCount!: number;
  subscription!: Subscription;

  searchProduct: String ='';
  sProducts: Product [] = [];

  constructor(private authService: AuthService, private router: Router, private productService: ProductService) { }
  
  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe(
      (cart) => this.cartCount = cart.cartCount
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  clickme() {
    
   /** this.productService.getSearchedProducts(this.searchProduct).subscribe(
     (resp) => this.sProducts = resp,
     (err) => console.log(err),
     () => console.log("Retrieving Searched Products"+this.searchProduct)
   )*/
  this.router.navigate(['search']); 
  }
}

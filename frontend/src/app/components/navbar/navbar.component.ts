import { Component, Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  @Output() searchEvent = new EventEmitter<string>();

  constructor(private authService: AuthService, private router: Router, private productService: ProductService) { }
  
  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe(
      (cart) => this.cartCount = cart.cartCount
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get url() {
    return this.router.url;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  search(query: string) {
    this.searchEvent.emit(query);
  }
}

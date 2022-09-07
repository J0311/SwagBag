import {
  Component,
  Injectable,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartCount!: number;
  subscription!: Subscription;

  @Output() searchEvent = new EventEmitter<string>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProductService,
    private theme: ThemeService
  ) {}

  ngOnInit(): void {
    this.subscription = this.productService
      .getCart()
      .subscribe((cart) => (this.cartCount = cart.cartCount));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Gets the current router url
   */
  get url() {
    return this.router.url;
  }

  /**
   * Gets the currently logged in user from session storage or null if none
   */
  get loggedInUser() {
    let user = sessionStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  /**
   * Emits a new event called 'searchEvent' as an Angular @Output
   * containing the search query
   * 
   * @param query The entered query in the search input
   */
  search(query: string) {
    this.searchEvent.emit(query);
  }

  public switchTheme(): void {
    if (this.theme.current === 'light') {
      this.theme.current = 'dark';
    } else {
      this.theme.current = 'light';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  loggedInUser: any = JSON.parse(sessionStorage.getItem('loggedInUser')!);
  allProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  /**
   * Retrieves an array of all products from the database on initialization
   */
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (resp) => (this.allProducts = resp),
      (err) => console.log(err),
      () => console.log('Products Retrieved')
    );
  }
}

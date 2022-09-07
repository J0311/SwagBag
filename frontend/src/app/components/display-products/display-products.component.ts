import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit {

  allProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (resp) => this.allProducts = resp,
      (err) => console.log(err),
      () => console.log("Products Retrieved")
    );
  }

  /**
   * If the search query is empty, gets all products and saves to allProducts;
   * otherwise gets all products containing the search query in the product name
   * and saves to allProducts
   * 
   * @param query The query to search
   */
  search(query: string): void {
    if (query.trim() === '') {
      this.productService.getAllProducts().subscribe(
        (resp) => this.allProducts = resp,
        (err) => console.log(err),
        () => console.log("Products Retrieved")
      );
    } else {
      this.productService.getProductsByQuery(query).subscribe(
        (resp) => this.allProducts = resp,
        (err) => console.log(err),
        () => console.log("Products from search query retrieved")
      );
    }
  }

}

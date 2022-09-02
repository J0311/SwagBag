import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

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

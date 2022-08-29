import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})

export class SearchProductComponent implements OnInit {

 @Input() sProducts: Product[] = [];
 @Input() productInfo!: Product;
 @Input() searchProduct: String ='';
 

  constructor(private productService: ProductService) { }

 ngOnInit(): void {
    
  }

  clickme(){
    this.productService.getSearchedProducts(this.searchProduct).subscribe(
      (resp) => this.sProducts = resp,
      (err) => console.log(err),
      () => console.log("Retrieving Searched Products"+this.searchProduct)
    );
  }


}

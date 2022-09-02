import { S3Service } from './../../services/s3.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.css'],
})
export class AdminEditProductComponent implements OnInit {
  productId: number = 0;
  productInfo!: Product;

  editProductForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
    quantity: new FormControl(''),
    price: new FormControl(''),
  });

  constructor(
    private productService: ProductService,
    private s3Service: S3Service,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
    }),
      this.productService
        .getSingleProduct(this.productId)
        .subscribe((product) => {
          this.productInfo = product;
          this.editProductForm.patchValue({
            name: this.productInfo.name,
            description: this.productInfo.description,
            image: this.productInfo.image,
            quantity: this.productInfo.quantity,
            price: this.productInfo.price,
          });
        });

    this.editProductForm.get('image')?.disable();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const randomImageName =
        'image-' + Math.floor(Math.random() * 1000000) + '.png';
      const url = this.s3Service.generateUploadUrl(randomImageName);
      this.s3Service.uploadImage(url, file).subscribe((resp) => {
        this.editProductForm.patchValue({
          image: url.split('?')[0],
        });
      });
    }
  }

  onSubmit() {
    this.editProductForm.get('image')?.enable();

    if (
      !this.editProductForm.get('name')?.value ||
      !this.editProductForm.get('description')?.value ||
      !this.editProductForm.get('image')?.value ||
      !this.editProductForm.get('quantity')?.value ||
      !this.editProductForm.get('price')?.value
    ) {
      alert('Please fill out all fields');
      return;
    }

    this.productService
      .updateProduct(this.productId, this.editProductForm.value)
      .subscribe((product) => {
        this.productInfo = product;
      });

    this.router.navigate(['/admin']);
  }
}

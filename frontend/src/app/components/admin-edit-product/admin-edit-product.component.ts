import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { S3Service } from '../../services/s3.service';
import { ProductService } from '../../services/product.service';

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

  url: string = '';
  file!: File;

  constructor(
    private productService: ProductService,
    private s3Service: S3Service,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Retrives the product id from the URL
   * Then populates the form with the current product info
   * If image file is changed, upload new image to s3 bucket
   * On submit, alerts if any of the fields are left blank
   * Otherwise, update the product in the database with the changed information / image.
   */
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
    });

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

    this.editProductForm.get('image')!.disable();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      const randomImageName =
        'image-' + Math.floor(Math.random() * 1000000) + '.png';
      this.url = this.s3Service.generateUploadUrl(randomImageName);
      this.editProductForm.patchValue({
        image: this.url.split('?')[0],
      });
    }
  }

  onSubmit() {
    this.editProductForm.get('image')!.enable();

    if (
      !this.editProductForm.get('name')!.value ||
      !this.editProductForm.get('description')!.value ||
      !this.editProductForm.get('image')!.value ||
      !this.editProductForm.get('quantity')!.value ||
      !this.editProductForm.get('price')!.value
    ) {
      alert('Please fill out all fields');
      return;
    }

    if (this.file) {
      this.s3Service.uploadImage(this.url, this.file).subscribe((resp) => {
        this.productService
          .updateProduct(this.productId, this.editProductForm.value)
          .subscribe((product) => {
            this.productInfo = product;
            this.router.navigate(['/admin']);
          });
      });
    } else {
      this.productService
        .updateProduct(this.productId, this.editProductForm.value)
        .subscribe((product) => {
          this.productInfo = product;
          this.router.navigate(['/admin']);
        });
    }
  }
}

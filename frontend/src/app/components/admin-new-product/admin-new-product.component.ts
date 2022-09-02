import { S3Service } from './../../services/s3.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-new-product',
  templateUrl: './admin-new-product.component.html',
  styleUrls: ['./admin-new-product.component.css'],
})
export class AdminNewProductComponent implements OnInit {
  addProductForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
    quantity: new FormControl(''),
    price: new FormControl(''),
  });

  constructor(
    private productService: ProductService,
    private s3Service: S3Service,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const randomImageName =
        'image-' + Math.floor(Math.random() * 1000000) + '.png';
      const url = this.s3Service.generateUploadUrl(randomImageName);
      this.s3Service.uploadImage(url, file).subscribe((resp) => {
        this.addProductForm.patchValue({
          image: url.split('?')[0],
        });
      });
    }
  }

  onSubmit() {
    if (
      !this.addProductForm.get('name')?.value ||
      !this.addProductForm.get('description')?.value ||
      !this.addProductForm.get('image')?.value ||
      !this.addProductForm.get('quantity')?.value ||
      !this.addProductForm.get('price')?.value
    ) {
      alert('Please fill out all fields');
      return;
    }

    const price = (
      Math.floor(this.addProductForm.get('price')?.value * 100) / 100
    ).toFixed(2);
    this.addProductForm.get('price')?.setValue(price);

    this.productService.addNewProduct(this.addProductForm.value).subscribe(
      (resp) => {
        this.addProductForm.reset();
        this.router.navigate(['/admin']);
      },
      (err) => console.log(err)
    );
  }
}

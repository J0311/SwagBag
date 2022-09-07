import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ProductReview } from './../../models/product-review';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductReviewService } from './../../services/product-review.service';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css'],
})
export class ProductReviewComponent implements OnInit {
  loggedInUser: any = JSON.parse(sessionStorage.getItem('loggedInUser')!);
  moment = moment;

  productId: number = 0;
  allProductReviews: ProductReview[] = [];
  averageRating: number = 0;

  reviewForm = new FormGroup({
    rating: new FormControl(''),
    title: new FormControl(''),
    review: new FormControl(''),
  });

  constructor(
    private productReviewService: ProductReviewService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.productReviewService.getProductReviews(this.productId).subscribe(
        (resp) => {
          this.allProductReviews = resp;
          if (this.allProductReviews.length > 0) {
            this.calculateAverageRating();
          }
        },
        (err) => console.log(err),
        () => console.log('Product Reviews Retrieved')
      );
    });
  }

  /**
   * Calculates average rating from the rating field of each Product Review
   */
  calculateAverageRating() {
    this.averageRating =
      this.allProductReviews.reduce((acc, curr) => acc + curr.rating, 0) /
      this.allProductReviews.length;
  }

  /**
   * First checks if any field in the form is empty and alerts if there is at least one empty field
   * Then uses the fields to add a product review to the database,
   * Then recalculates the average rating
   * Finally, resets the form
   */
  onSubmit() {
    if (
      !this.reviewForm.get('rating')!.value ||
      !this.reviewForm.get('title')!.value ||
      !this.reviewForm.get('review')!.value
    ) {
      alert('Please fill out all fields');
      return;
    }

    this.productReviewService
      .addProductReview(
        this.productId,
        this.loggedInUser.id,
        this.loggedInUser.name,
        this.reviewForm.get('rating')!.value,
        this.reviewForm.get('title')!.value,
        this.reviewForm.get('review')!.value
      )
      .subscribe(
        (res) => {
          this.allProductReviews.push(res);
          this.calculateAverageRating();
          this.reviewForm.reset();
        },
        (err) => console.log(err)
      );
  }

  /**
   * Uses the passed in product review id to delete that review from the database
   * Then recalculates the average rating
   * @param id 
   */
  onDelete(id: number) {
    this.productReviewService.deleteProductReview(id).subscribe((res) => {
      this.allProductReviews = this.allProductReviews.filter(
        (review) => review.id !== id
      );
      this.calculateAverageRating();
    });
  }
}

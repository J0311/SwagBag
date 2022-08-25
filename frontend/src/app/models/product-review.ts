import { Product } from 'src/app/models/product';
export class ProductReview {
  id: number;
  productId: number;
  reviewerId: number;
  reviewerName: String;
  rating: number;
  title: string;
  review: string;

  constructor(
    id: number,
    productId: number,
    reviewerId: number,
    reviewerName: String,
    rating: number,
    title: string,
    review: string
  ) {
    this.id = id;
    this.productId = productId;
    this.reviewerId = reviewerId;
    this.reviewerName = reviewerName;
    this.rating = rating;
    this.title = title;
    this.review = review;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductReview } from '../models/product-review';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductReviewService {
  private productReviewUrl = '/api/product-reviews';

  constructor(private http: HttpClient) {}

  public getProductReviews(productId: number): Observable<ProductReview[]> {
    return this.http.get<ProductReview[]>(
      environment.baseUrl + this.productReviewUrl + '/' + productId,
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      }
    );
  }

  public addProductReview(
    productId: number,
    reviewerId: number,
    reviewerName: String,
    rating: number,
    title: string,
    review: string
  ): Observable<any> {
    const payload = {
      productId: productId,
      reviewerId: reviewerId,
      reviewerName: reviewerName,
      rating: rating,
      title: title,
      review: review,
    };
    return this.http.post<any>(
      environment.baseUrl + this.productReviewUrl,
      payload,
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      }
    );
  }

  public deleteProductReview(id: number): Observable<any> {
    return this.http.delete<any>(
      environment.baseUrl + this.productReviewUrl + '/' + id,
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      }
    );
  }
}

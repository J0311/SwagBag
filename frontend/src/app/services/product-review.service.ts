import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductReview } from '../models/product-review';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductReviewService {
  private productReviewUrl = '/api/product-reviews';

  constructor(private http: HttpClient) {}

  /**
   * Retrieve all product reviews from the database
   * for the product with the passed in productId
   * @param productId 
   * @returns 
   */
  public getProductReviews(productId: number): Observable<ProductReview[]> {
    return this.http.get<ProductReview[]>(
      environment.baseUrl + this.productReviewUrl + '/' + productId,
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      }
    );
  }

  /**
   * Use params to send a request to add a new product to the database
   * @param productId 
   * @param reviewerId 
   * @param reviewerName 
   * @param rating 
   * @param title 
   * @param review 
   * @returns 
   */
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

  /**
   * Sends a delete request to delete product review
   * with the passed in id
   * @param id 
   * @returns 
   */
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

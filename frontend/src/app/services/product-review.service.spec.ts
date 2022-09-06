import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { ProductReview } from "../models/product-review";
import { ProductReviewService } from "./product-review.service";



//Add 3 test reviews
const productReview1: ProductReview = {
    id: 1,
    productId: 1,
    reviewerId: 1,
    reviewerName: 'test',
    rating: 1,
    title: 'testReview1',
    review: 'review',
    timestamp: new Date(2022, 9)
}
const productReview2: ProductReview = {
    id: 2,
    productId: 1,
    reviewerId: 1,
    reviewerName: 'test',
    rating: 3,
    title: 'testReview2',
    review: 'review',
    timestamp: new Date(2022, 9)
}
const productReview3: ProductReview = {
    id: 3,
    productId: 1,
    reviewerId: 1,
    reviewerName: 'test',
    rating: 5,
    title: 'testReview3',
    review: 'review',
    timestamp: new Date(2022, 9)
}
const productReviews: ProductReview[] = [
    productReview1,
    productReview2,
]

const mockHttpClient: any = {
    get: jest.fn((id: number) => {return of(productReviews)}),
    post: jest.fn((id: number) => {return of(productReview3)}),
    delete: jest.fn((id: number) => {return of(productReview2)})
}

let fixture: ProductReviewService;


describe('ProductReviewService', () => {
    beforeEach(() => {
        fixture = new ProductReviewService(mockHttpClient as HttpClient);
    })
    
    describe('getProductReviews', () => {
        it('should call http.get', () => {
            //Arrange
            let getSpy = jest.spyOn(mockHttpClient, 'get')
            //Act
            fixture.getProductReviews(1);
            //Assert
            expect(mockHttpClient.get).toBeCalled();
        })
    });
    describe('addProductReview', () => {
        it('should call http.post', () => {
            //Arrange
            let getSpy = jest.spyOn(mockHttpClient, 'post')
            //Act
            fixture.addProductReview(1,2,'a', 3, 'b', 'c');
            //Assert
            expect(mockHttpClient.post).toBeCalled();
        })
    });
    describe('deleteProductReview', () => {
        it('should call http.delete', () => {
            //Arrange
            let getSpy = jest.spyOn(mockHttpClient, 'delete')
            //Act
            fixture.deleteProductReview(1);
            //Assert
            expect(mockHttpClient.delete).toBeCalled();
        })
    });
});

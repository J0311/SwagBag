import { TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs/internal/observable/of";
import { ProductReview } from "src/app/models/product-review";
import { User } from "src/app/models/user";
import { ProductReviewService } from "src/app/services/product-review.service";
import { ProductReviewComponent } from "./product-review.component";

const mockProductReviewService: any = {
    addProductReview: jest.fn(),
    deleteProductReview: jest.fn()
};

describe('ProductReviewComponent', () => {
    let component: ProductReviewComponent;
    let fixture: ProductReviewComponent;
    let productReviewServiceMock: ProductReviewService;
    let activatedRouteMock: ActivatedRoute;

    


    

    beforeEach( () => {
        

        const testUser: User = {
            id: 1,
            email: 'test@test.com',
            password: 'test',
            firstName: 'test',
            lastName: 'user',
        }

        sessionStorage.setItem('loggedInUser', JSON.stringify(testUser));

        // fixture = new ProductReviewComponent(productReviewServiceMock, activatedRouteMock);


        

        // MIGHT USE THIS TOO
        // jest.spyOn(productReviewServiceMock, 'addProductReview').mockReturnValue(
        //     of({
        //         id: 3,
        //         productId: 1,
        //         reviewerId: 1,
        //         reviewerName: 'test',
        //         rating: 5,
        //         title: 'testReview3',
        //         review: 'review',
        //         timestamp: new Date(2022, 9)
        //     })
        // );
    });

    // Tests for component initialization
    describe( 'Setup component', () => {
        

        // Tests for default field values
        describe( 'productId', () => {
            
            it( 'should be set to 0', () => {
                //Arrange
                fixture = new ProductReviewComponent(productReviewServiceMock, activatedRouteMock);
                //Assert
                expect(fixture.productId).toBe(0);
            });
        });

        describe('allProductReviews', () => {
            
            it( 'should be set to any empty array', () => {
                //Arrange
                fixture = new ProductReviewComponent(productReviewServiceMock, activatedRouteMock);
                //Assert
                expect(fixture.allProductReviews).toStrictEqual([])
            });
        });

        describe( 'averageRating', () => {
            
            it( 'should be set to 0', () => {
                //Arrange
                fixture = new ProductReviewComponent(productReviewServiceMock, activatedRouteMock);
                //Assert
                expect(fixture.averageRating).toBe(0);
            });
        });


        // TODO
        // Tests for ngOnInit
        describe( 'ngOnInit', () => {

            describe('productId', () => {

                it( 'should be set to route\'s id value', () => {
                    
                });

            });
        });
    }); // End of setup tests

    // Test for calculateAverageRating
    describe('calculateAverageRating()', () => {
        it('should have average of 3 for 1,3 and 5', () => {
            //Arrange
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
            fixture.allProductReviews = [
                productReview1,
                productReview2,
                productReview3
            ]

            //Act
            fixture.calculateAverageRating();

            //Assert
            expect(fixture.averageRating).toBe(3);
        })
    });

    //onSubmit tests
    describe('onSubmit()', () => {
        // Add two reviews to allReviews
        beforeEach( () => {
            fixture = new ProductReviewComponent(mockProductReviewService as ProductReviewService, activatedRouteMock);

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
            fixture.allProductReviews = [
                productReview1,
                productReview2,
            ]
        });
        describe('missing rating in form', () => {
            it('should alert', () => {
                
                //ARRANGE
                // watch for alert to be called
                const alertSpy = jest.spyOn(window, 'alert');

                //Mock the form
                function updateForm(title: string, review: string) {
                    fixture.reviewForm.controls['title'].setValue(title);
                    fixture.reviewForm.controls['review'].setValue(review);
                }
                updateForm('test', 'testreview');

                //ACT
                fixture.onSubmit();

                //ASSERT
                expect(alertSpy).toHaveBeenCalled()
            })
        });

        describe('missing title in form', () => {
            it('should alert', () => {
                
                //ARRANGE
                // watch for alert to be called
                const alertSpy = jest.spyOn(window, 'alert');

                //Mock the form
                function updateForm(rating: string, review: string) {
                    fixture.reviewForm.controls['rating'].setValue(rating);
                    fixture.reviewForm.controls['review'].setValue(review);
                }
                updateForm('test', 'testreview');

                //ACT
                fixture.onSubmit();

                //ASSERT
                expect(alertSpy).toHaveBeenCalled()
            })
        });
        
        describe('missing review in form', () => {
            it('should alert', () => {
                
                //ARRANGE
                // watch for alert to be called
                const alertSpy = jest.spyOn(window, 'alert');

                //Mock the form
                function updateForm(title: string, rating: string) {
                    fixture.reviewForm.controls['title'].setValue(title);
                    fixture.reviewForm.controls['rating'].setValue(rating);
                }
                updateForm('test', 'testreview');

                //ACT
                fixture.onSubmit();

                //ASSERT
                expect(alertSpy).toHaveBeenCalled()
            })
        });

        describe('allProductReviews', () => {
            it('should have latest review', () => {
                //ARRANGE
                const testReview = {
                    id: 3,
                    productId: 1,
                    reviewerId: 1,
                    reviewerName: 'test',
                    rating: 5,
                    title: 'testReview3',
                    review: 'review',
                    timestamp: new Date(2022, 9)
                };

                //Mock the form
                function updateForm(rating: number, title: string, review: string) {
                    fixture.reviewForm.controls['rating'].setValue(rating);
                    fixture.reviewForm.controls['title'].setValue(title);
                    fixture.reviewForm.controls['review'].setValue(review);
                }
                updateForm(5, 'test', 'testreview');

                jest.spyOn(mockProductReviewService, 'addProductReview').mockImplementation(() => {
                    return of({
                        id: 3,
                        productId: 1,
                        reviewerId: 1,
                        reviewerName: 'test',
                        rating: 5,
                        title: 'testReview3',
                        review: 'review',
                        timestamp: new Date(2022, 9)
                    });
                })

                //ACT
                fixture.onSubmit();

                //ASSERT
                expect(fixture.allProductReviews[2]).toEqual(testReview);
            })
        });

        describe('averageRating', () => {
            it('should be updated', () => {
                //ARRANGE
                //Mock the form
                function updateForm(rating: number, title: string, review: string) {
                    fixture.reviewForm.controls['rating'].setValue(rating);
                    fixture.reviewForm.controls['title'].setValue(title);
                    fixture.reviewForm.controls['review'].setValue(review);
                }
                updateForm(5, 'test', 'testreview');

                jest.spyOn(mockProductReviewService, 'addProductReview').mockImplementation(() => {
                    return of({
                        id: 3,
                        productId: 1,
                        reviewerId: 1,
                        reviewerName: 'test',
                        rating: 5,
                        title: 'testReview3',
                        review: 'review',
                        timestamp: new Date(2022, 9)
                    });
                })

                //ACT
                fixture.onSubmit();

                //ASSERT
                expect(fixture.averageRating).toEqual(3);
            })
        });

        describe('reviewFrom', () => {
            it('should be reset', () => {
                //ARRANGE
                //Mock the form
                function updateForm(rating: number, title: string, review: string) {
                    fixture.reviewForm.controls['rating'].setValue(rating);
                    fixture.reviewForm.controls['title'].setValue(title);
                    fixture.reviewForm.controls['review'].setValue(review);
                }
                updateForm(5, 'test', 'testreview');

                jest.spyOn(mockProductReviewService, 'addProductReview').mockImplementation(() => {
                    return of({
                        id: 3,
                        productId: 1,
                        reviewerId: 1,
                        reviewerName: 'test',
                        rating: 5,
                        title: 'testReview3',
                        review: 'review',
                        timestamp: new Date(2022, 9)
                    });
                })

                //ACT
                fixture.onSubmit();

                //ASSERT
                expect(fixture.reviewForm.controls['rating'].value).toBeNull;
                expect(fixture.reviewForm.controls['title'].value).toBeNull;
                expect(fixture.reviewForm.controls['review'].value).toBeNull;
            })
        });
    });

    describe('onDelete', () => {
        beforeEach(() => {
            fixture = new ProductReviewComponent(mockProductReviewService as ProductReviewService, activatedRouteMock);

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
            fixture.allProductReviews = [
                productReview1,
                productReview2,
                productReview3
            ]

            const expectedReviews = [productReview1, productReview2];

        })
        describe('allProductReviews', () => {
            const expectedReview1: ProductReview = {
                id: 1,
                productId: 1,
                reviewerId: 1,
                reviewerName: 'test',
                rating: 1,
                title: 'testReview1',
                review: 'review',
                timestamp: new Date(2022, 9)
            }
            const expectedReview2: ProductReview = {
                id: 2,
                productId: 1,
                reviewerId: 1,
                reviewerName: 'test',
                rating: 3,
                title: 'testReview2',
                review: 'review',
                timestamp: new Date(2022, 9)
            }

            const expectedReviews = [expectedReview1, expectedReview2];

            it('should have reviews 1 and 2 after deleting 3', () => {
                 //Arrange
                 const allReviewsStub = of(fixture.allProductReviews) 

                 jest.spyOn(mockProductReviewService, 'deleteProductReview').mockImplementation(() => {
                    return allReviewsStub
                 })

                 //Act
                 fixture.onDelete(3);

                 //Assert
                 expect(fixture.allProductReviews).toEqual(expectedReviews);
            })
        });

        describe('averageRating', () => {
            it('should be 2 after deleting review #3', () => {
                //Arrange
                const allReviewsStub = of(fixture.allProductReviews) 

                jest.spyOn(mockProductReviewService, 'deleteProductReview').mockImplementation(() => {
                return allReviewsStub
                })

                //Act
                fixture.onDelete(3);

                //Assert
                expect(fixture.averageRating).toEqual(2);
            })
        });
    });
});
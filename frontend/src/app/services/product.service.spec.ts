import { Product } from '../models/product';
import { ProductService } from './product.service';
import { environment } from '../../environments/environment';

describe('ProductService', () => {
    let service: ProductService;
    let httpClientMock: any;
    let products: Product[];

    beforeEach(() => {
        httpClientMock = {
            get: jest.fn(),
            patch: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
        };
        products = [
            new Product(0, "Bag", 50, "", 1.99, ""),
            new Product(1, "TeeShirt", 40, "", 9.99, ""),
            new Product(2, "Mug", 100, "", 3.95, ""),  
        ];
        service = new ProductService(httpClientMock);
    });

    describe('get methods', () => {
        describe('getAllProducts', () => {
            it('should be defined', () => {
                expect(service.getAllProducts).toBeDefined();
            });

            it('should send a get request', () => {
                service.getAllProducts();
                expect(httpClientMock.get).toBeCalled();
            });

            it('should send a get request for endpoint ending in /api/product', () => {
                const expected = environment.baseUrl + '/api/product';
                service.getAllProducts();
                expect(httpClientMock.get).toBeCalledWith(expected, expect.anything());
            });
        });
        
        describe('getSingleProduct', () => {
            it('should be defined', () => {
                expect(service.getSingleProduct).toBeDefined();
            });

            it('should send a get request', () => {
                service.getSingleProduct(0);
                expect(httpClientMock.get).toBeCalled();
            });
            
            it('should send a get request for endpoint ending in /api/product/{id}', () => {
                const expected = environment.baseUrl + '/api/product/1';
                service.getSingleProduct(1);
                expect(httpClientMock.get).toBeCalledWith(expected, expect.anything());
            });
        });
        
        describe('getProductsByQuery', () => {
            it('should be defined', () => {
                expect(service.getProductsByQuery).toBeDefined();
            });

            it('should send a get request', () => {
                service.getProductsByQuery('bag');
                expect(httpClientMock.get).toBeCalled();
            });

            it('should send a get request for endpoint ending in /api/product/search/{query}', () => {
                const expectedPath = environment.baseUrl + '/api/product/search/bag';
                service.getProductsByQuery('bag');
                expect(httpClientMock.get).toBeCalledWith(expectedPath, expect.anything());
            });
        });
    });

    describe('purchase', () => {
        it('should be defined', () => {
            expect(service.purchase).toBeDefined();
        });

        it('should send a patch request', () => {
            service.purchase([]);
            expect(httpClientMock.patch).toBeCalled();
        });

        it('should send a patch request for endpoint ending in /api/product', () => {
            const expectedPath = environment.baseUrl + '/api/product';
            service.purchase([]);
            expect(httpClientMock.patch).toBeCalledWith(expectedPath, expect.anything(), expect.anything());
        });

        it('should send a patch request with a body containing a JSON string of an array of { id: number, quantity: number }', () => {
            const metadata = [
                { id: 0, quantity: 5 },
                { id: 1, quantity: 2 }
            ];
            const expectedBody = JSON.stringify(metadata);
            service.purchase(metadata);
            expect(httpClientMock.patch).toBeCalledWith(expect.anything(), expectedBody, expect.anything());
        });
    });

    describe('addNewProduct', () => {
        it('should be defined', () => {
            expect(service.addNewProduct).toBeDefined();
        });

        it('should send a post request', () => {
            service.addNewProduct(products[0]);
            expect(httpClientMock.post).toBeCalled();
        });

        it('should send a post request for endpoint ending in /api/product', () => {
            const expectedPath = environment.baseUrl + '/api/product';
            service.addNewProduct(products[0]);
            expect(httpClientMock.post).toBeCalledWith(expectedPath, expect.anything(), expect.anything());
        });

        it('should send a post request with a body containing a Product', () => {
            const expectedBody = products[0];
            service.addNewProduct(expectedBody);
            expect(httpClientMock.post).toBeCalledWith(expect.anything(), expectedBody, expect.anything());
        });
    });

    describe('updateProduct', () => {
        it('should be defined', () => {
            expect(service.updateProduct).toBeDefined();
        });

        it('should send a put request', () => {
            service.updateProduct(0, products[0]);
            expect(httpClientMock.put).toBeCalled();
        });

        it('should send a put request for endpoint ending in /api/product/{id}', () => {
            const expectedPath = environment.baseUrl + '/api/product/0';
            service.updateProduct(0, products[0]);
            expect(httpClientMock.put).toBeCalledWith(expectedPath, expect.anything(), expect.anything());
        });

        it('should send a put request with a body containing a Product', () => {
            const expectedBody = products[0];
            service.updateProduct(0, expectedBody);
            expect(httpClientMock.put).toBeCalledWith(expect.anything(), expectedBody, expect.anything());
        });
    });

    describe('getters/setters', () => {
        describe('get cart', () => {
            it('should be defined', () => {
                expect(service.cart).toBeDefined();
            });
        });

        describe('getCart', () => {
            it('should be defined', () => {
                expect(service.getCart).toBeDefined();
            });
            
            it('should return', () => {
                const getCartSpy = jest.spyOn(service, 'getCart');
                service.getCart();
                expect(getCartSpy).toReturn();
            });
        });

        describe('setCart', () => {
            it('should be defined', () => {
                expect(service.setCart).toBeDefined();
            });

            it('should return', () => {
                const setCartSpy = jest.spyOn(service, 'setCart');
                service.setCart({cartCount: 0, products: [], totalPrice: 0});
                expect(setCartSpy).toReturn();
            });
        });
    });
});
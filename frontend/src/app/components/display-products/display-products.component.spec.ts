import { of, throwError } from "rxjs";
import { Product } from "../../models/product";
import { DisplayProductsComponent } from "./display-products.component";

describe('DisplayProductsComponent', () => {
    let comp: DisplayProductsComponent;
    let productServiceMock: any = {
        getAllProducts: () => {},
        getProductsByQuery: (query: string) => {},
    }
    let products: Product[];

    beforeEach(() => {
        products = [
            new Product(0, "Bag", 12, "", 1.99, ""),
            new Product(1, "Baseball Cap", 25, "", 12.99, ""),
            new Product(2, "Mug", 50, "", 4.95, "")
        ];
        comp = new DisplayProductsComponent(productServiceMock);
    });

    describe('ngOnInit', () => {
        it('should not have any products on construction', () => {
            expect(comp.allProducts.length).toBe(0);
        });
    
        it('should fetch all products on init', () => {
            jest.spyOn(productServiceMock, 'getAllProducts').mockReturnValue(of(products));
            comp.ngOnInit();
            expect(comp.allProducts.length).toBe(products.length);
        });
    
        it('should have an empty product array on init failure', () => {
            jest.spyOn(productServiceMock, 'getAllProducts').mockReturnValue(throwError('error'));
            const consoleSpy = jest.spyOn(console, 'log');
            comp.ngOnInit();
            expect(comp.allProducts.length).toBe(0);
            expect(consoleSpy).toHaveBeenCalledWith('error');
        });
    });

    describe('search', () => {
        it('should return all products on an empty query', () => {
            jest.spyOn(productServiceMock, 'getAllProducts')
                .mockReturnValue(of(products));
            comp.search('');
            expect(comp.allProducts.length).toBe(products.length);
        });

        it('should return a list of products on query', () => {
            const expected: Product[] = [products[0], products[2]];
            jest.spyOn(productServiceMock, 'getProductsByQuery')
                .mockReturnValue(of(expected));
            comp.search('G');
            expect(comp.allProducts).toEqual(expected);
        });
        
        it('should not update allProducts on empty query failure', () => {
            jest.spyOn(productServiceMock, 'getAllProducts')
                .mockReturnValue(throwError('error'));
            const initialProducts = comp.allProducts;
            const consoleSpy = jest.spyOn(console, 'log');

            comp.search('');
            expect(comp.allProducts).toEqual(initialProducts);
            expect(consoleSpy).toHaveBeenCalledWith('error');
        });

        it('should not update allProducts on valid query failure', () => {
            jest.spyOn(productServiceMock, 'getProductsByQuery')
                .mockReturnValue(throwError('error'));
            const initialProducts = comp.allProducts;
            const consoleSpy = jest.spyOn(console, 'log');
            
            comp.search('Bag');
            expect(comp.allProducts).toEqual(initialProducts);
            expect(consoleSpy).toHaveBeenCalledWith('error');
        });
    });
});
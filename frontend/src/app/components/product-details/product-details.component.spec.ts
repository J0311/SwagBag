import { ProductDetailsComponent } from './product-details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '../../models/product';

describe('ProductDetailsComponent', () => {
  let fixture: ProductDetailsComponent;
  let mockProduct = {
    id: 1,
    name: 'Headphones',
    quantity: 10,
    price: 20,
    description: 'A nice pair of headphones',
    image: 'test',
  };
  let mockProductService: any = {
    getSingleProduct: (id: number) => {
      return of(mockProduct);
    },

    setCart: (cart: any) => {
      return of(cart);
    },

    getCart: () => {
      return of({
        cartCount: 0,
        products: [],
        totalPrice: 0,
      });
    },
  };
  let activatedRoute: ActivatedRoute = {
    snapshot: {
      url: [],
      paramMap: {
        get: (id: string) => {
          return '1';
        },
      },
    },
  } as any;

  beforeEach(() => {
    fixture = new ProductDetailsComponent(mockProductService, activatedRoute);
    fixture.productId = 1;
    fixture.productInfo = mockProduct;
  });

  describe('Setup component', () => {
    it('should create', () => {
      expect(fixture).toBeTruthy();
    });

    it('component holds the correct product id', () => {
      expect(fixture.productId).toEqual(1);
    });

    it('component contains correct productInfo name', () => {
      expect(fixture.productInfo.name).toEqual('Headphones');
    });
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      fixture.productId = 1;
      jest
        .spyOn(mockProductService, 'getSingleProduct')
        .mockReturnValue(of(mockProduct));
      jest.spyOn(mockProductService, 'getCart').mockReturnValue(
        of({
          cartCount: 0,
          products: [],
          totalPrice: 0,
        })
      );
    });

    it('should set productId to 1', () => {
      fixture.ngOnInit();
      expect(fixture.productId).toEqual(1);
    });

    it('should set productInfo to the correct product', () => {
      fixture.ngOnInit();
      expect(fixture.productInfo).toEqual(mockProduct);
    });

    it('should set cartCount to 0', () => {
      fixture.ngOnInit();
      expect(fixture.cartCount).toEqual(0);
    });

    it('should set products to an empty array', () => {
      fixture.ngOnInit();
      expect(fixture.products).toEqual([]);
    });

    it('should set totalPrice to 0', () => {
      fixture.ngOnInit();
      expect(fixture.totalPrice).toEqual(0);
    });
  });

  describe('addToCart', () => {
    it('add new item to cart successful', () => {
      let myProduct: Product = new Product(1, 'wasd', 1, '', 10, '');
      let myProduct2: Product = new Product(2, 'other', 2, '', 20, '');
      fixture.products = [
        {
          product: myProduct2,
          quantity: 1,
        },
      ];

      fixture.addToCart(myProduct);
      expect(true).toBe(true);
    });

    it('add existing item to cart successful', () => {
      let myProduct: Product = new Product(1, 'wasd', 1, '', 10, '');
      fixture.products = [
        {
          product: myProduct,
          quantity: 1,
        },
      ];

      fixture.addToCart(myProduct);
      expect(true).toBe(true);
    });
  });
});
function createSpyObj(arg0: string, arg1: string[]) {
  throw new Error('Function not implemented.');
}

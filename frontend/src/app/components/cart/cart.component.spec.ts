import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let fixture: CartComponent;
  let productServiceMock = {
    getCart: () => {
      return of({
        cartCount: 0,
        products: [],
        totalPrice: 0.0,
      });
    },

    setCart: (cart: any) => {
      return of(cart);
    },
  } as any;

  let routerMock = {
    navigate: (path: string[]) => {
      return of(path);
    },
  } as any;

  beforeEach(() => {
    fixture = new CartComponent(productServiceMock, routerMock);
  });

  describe('Setup component', () => {
    it('should setup component', () => {
      expect(fixture).toBeTruthy();
    });

    it('should define products', () => {
      expect(fixture.products).toBeDefined();
    });

    it('should define totalPrice', () => {
      expect(fixture.totalPrice).toBeDefined();
    });
  });

  describe('ngOnInit()', () => {
    beforeEach(() => {
      jest.spyOn(productServiceMock, 'getCart').mockReturnValue(
        of({
          cartCount: 1,
          products: [
            {
              product: {
                id: 1,
                name: 'test',
                price: 1.0,
                quantity: 1,
                description: 'test',
                image: 'test',
              },
            },
          ],
          totalPrice: 5.99,
        })
      );
    });

    it('should call getCart()', () => {
      fixture.ngOnInit();
      expect(productServiceMock.getCart).toHaveBeenCalled();
    });

    it('should set products', () => {
      fixture.ngOnInit();
      expect(fixture.products).toEqual([
        {
          product: {
            id: 1,
            name: 'test',
            price: 1.0,
            quantity: 1,
            description: 'test',
            image: 'test',
          },
        },
      ]);
    });

    it('should set totalPrice', () => {
      fixture.ngOnInit();
      expect(fixture.totalPrice).toEqual(5.99);
    });
  });

  describe('emptyCart()', () => {
    beforeEach(() => {
      jest.spyOn(productServiceMock, 'setCart').mockReturnValue(
        of({
          cartCount: 0,
          products: [],
          totalPrice: 0.0,
        })
      );
      jest.spyOn(routerMock, 'navigate').mockReturnValue(of(['']));
    });

    it('should call setCart()', () => {
      fixture.emptyCart();
      expect(productServiceMock.setCart).toHaveBeenCalled();
    });

    it('should navigate to /home', () => {
      fixture.emptyCart();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
    });
  });

  describe('removeFromCart()', () => {
    beforeEach(() => {
      jest.spyOn(productServiceMock, 'setCart').mockReturnValue(
        of({
          cartCount: 0,
          products: [],
          totalPrice: 0.0,
        })
      );

      productServiceMock.cart = {
        cartCount: 1,
        products: [
          {
            product: {
              id: 1,
              name: 'test',
              price: 1.0,
              quantity: 1,
              description: 'test',
              image: 'test',
            },
            quantity: 1,
          },
        ],
        totalPrice: 5.99,
      };

      fixture.products = [
        {
          product: {
            id: 1,
            name: 'test',
            price: 1.0,
            quantity: 1,
            description: 'test',
            image: 'test',
          },
          quantity: 2,
        },
      ];

      fixture.removeFromCart({
        id: 1,
        name: 'test',
        price: 1.0,
        quantity: 1,
        description: 'test',
        image: 'test',
      });
    });

    it('should decrease quantity', () => {
      expect(fixture.products[0].quantity).toEqual(1);
    });

    it('should filter products', () => {
      fixture.products[0].quantity = 1;
      fixture.removeFromCart({
        id: 1,
        name: 'test',
        price: 1.0,
        quantity: 1,
        description: 'test',
        image: 'test',
      });

      expect(fixture.products).toEqual([]);
    });

    it('should decrease cart.cartCount', () => {
      productServiceMock.cart.cartCount = 2;
      fixture.removeFromCart({
        id: 1,
        name: 'test',
        price: 1.0,
        quantity: 1,
        description: 'test',
        image: 'test',
      });

      expect(productServiceMock.cart.cartCount).toEqual(1);
    });

    it('should set products', () => {
      expect(fixture.products.length).toEqual(1);
    });

    it('should set totalPrice', () => {
      expect(fixture.totalPrice).toEqual(0.0);
    });

    it('should setCart', () => {
      expect(productServiceMock.setCart).toHaveBeenCalled();
    });
  });

  describe('addToCart()', () => {
    beforeEach(() => {
      jest.spyOn(productServiceMock, 'setCart').mockReturnValue(
        of({
          cartCount: 0,
          products: [],
          totalPrice: 0.0,
        })
      );

      productServiceMock.cart = {
        cartCount: 1,
        products: [
          {
            product: {
              id: 1,
              name: 'test',
              price: 1.0,
              quantity: 1,
              description: 'test',
              image: 'test',
            },
            quantity: 1,
          },
        ],
        totalPrice: 5.99,
      };

      fixture.products = [
        {
          product: {
            id: 1,
            name: 'test',
            price: 1.0,
            quantity: 2,
            description: 'test',
            image: 'test',
          },
          quantity: 1,
        },
      ];

      fixture.addToCart({
        id: 1,
        name: 'test',
        price: 1.0,
        quantity: 1,
        description: 'test',
        image: 'test',
      });
    });

    it('should find product', () => {
      expect(fixture.products.length).toEqual(1);
    });

    it('should increase quantity', () => {
      expect(fixture.products[0].quantity).toEqual(2);
    });

    it('should increase cart.cartCout', () => {
      expect(productServiceMock.cart.cartCount).toEqual(2);
    });

    it('should increase cart.totalPrice', () => {
      expect(productServiceMock.cart.totalPrice).toEqual(6.99);
    });
  });
});

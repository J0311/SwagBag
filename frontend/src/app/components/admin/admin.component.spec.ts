import { of, throwError } from 'rxjs';
import { Product } from './../../models/product';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let fixture: AdminComponent;
  let productServiceMock: any = {
    getAllProducts: jest.fn(),
  };

  beforeEach(() => {
    fixture = new AdminComponent(productServiceMock);
  });

  describe('Setup component', () => {
    describe('loggedInUser', () => {
      it('should be defined', () => {
        expect(fixture.loggedInUser).toBeDefined();
      });
    });

    describe('allProducts', () => {
      it('should be defined', () => {
        expect(fixture.allProducts).toBeDefined();
      });
    });
  });

  describe('ngOnInit', () => {
    it('should call getAllProducts', () => {
      const spy = jest
        .spyOn(productServiceMock, 'getAllProducts')
        .mockReturnValue(of([]));

      fixture.ngOnInit();
      expect(productServiceMock.getAllProducts).toHaveBeenCalled();
    });

    it('should set allProducts', () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'test',
          quantity: 1,
          price: 1.99,
          description: 'test',
          image: 'test',
        },
        {
          id: 2,
          name: 'test2',
          quantity: 2,
          price: 2.99,
          description: 'test2',
          image: 'test2',
        },
      ];

      jest.spyOn(productServiceMock, 'getAllProducts').mockReturnValue({
        subscribe: jest.fn().mockImplementation((fn) => fn(mockProducts)),
      });

      fixture.ngOnInit();
      expect(fixture.allProducts.length).toEqual(mockProducts.length);
      expect(fixture.allProducts).toEqual(mockProducts);
    });

    it('should log error', () => {
      const consoleSpy = jest.spyOn(console, 'log');

      jest
        .spyOn(productServiceMock, 'getAllProducts')
        .mockImplementation(() => {
          return throwError('test error');
        });

      fixture.ngOnInit();
      expect(consoleSpy).toHaveBeenCalledWith('test error');
    });
  });
});

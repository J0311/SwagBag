import { of, throwError } from 'rxjs';
import { Order } from '../../models/order';
import { User } from '../../models/user';
import { DisplayOrdersComponent } from './display-orders.component';

describe('DisplayOrdersComponent', () => {
  let fixture: DisplayOrdersComponent;
  let orderServiceMock: any = {
    getOrders: () => {},
  };
  let orders: Order[];

  beforeEach(() => {
    orders = [
      new Order(0, {} as User, new Date(), []),
      new Order(1, {} as User, new Date(), []),
    ];

    fixture = new DisplayOrdersComponent(orderServiceMock);
  });

  it('should not have any orders upon construction', () => {
    expect(fixture.allOrders).toEqual([]);
  });

  it('should fetch user orders on init', () => {
    jest.spyOn(orderServiceMock, 'getOrders').mockReturnValue(of(orders));
    fixture.ngOnInit();
    expect(fixture.allOrders).toEqual(orders);
  });

  it('should reset allOrders on failure to fetch user orders', () => {
    jest
      .spyOn(orderServiceMock, 'getOrders')
      .mockReturnValue(throwError('error'));
    const consoleSpy = jest.spyOn(console, 'log');

    fixture.ngOnInit();
    expect(fixture.allOrders).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith('error');
  });
});

import { OrderService } from "../../services/order.service";
import { DisplayOrdersComponent } from "./display-orders.component";

describe('DisplayOrdersComponent', () => {
    let fixture: DisplayOrdersComponent;
    let orderService: OrderService;
  
    beforeEach(() => {
      fixture = new DisplayOrdersComponent(orderService);
    });
  
    it('should not have any orders', () => {
      expect(fixture.allOrders.length).toEqual(0);
    });
  });
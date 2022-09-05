import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of, throwError } from "rxjs";
import { Order } from "../../models/order";
import { User } from "../../models/user";
import { OrderService } from "../../services/order.service";
import { DisplayOrdersComponent } from "./display-orders.component";

describe('DisplayOrdersComponent', () => {
    let fixture: ComponentFixture<DisplayOrdersComponent>;
    let comp: DisplayOrdersComponent;
    let orderServiceMock: Partial<OrderService>;
    let orders: Order[];
  
    beforeEach(() => {
      orders = [
        new Order(0, {} as User, new Date(), []),
        new Order(1, {} as User, new Date(), [])
      ];
      orderServiceMock = {
        getOrders: jest.fn().mockReturnValue(of(orders))
      };
      TestBed.configureTestingModule({
        declarations: [DisplayOrdersComponent],
        providers: [ { provide: OrderService, useValue: orderServiceMock }],
      });
      fixture = TestBed.createComponent(DisplayOrdersComponent);
      comp = fixture.componentInstance;
    });
  
    it('should not have any orders upon construction', () => {
      expect(comp.allOrders.length).toEqual(0);
    });

    it('should fetch user orders on init', () => {
      comp.ngOnInit();
      expect(comp.allOrders.length).toBe(2);
    });

    it('should reset allOrders on failure to fetch user orders', () => {
      orderServiceMock.getOrders = jest.fn().mockReturnValue(throwError("Error"));
      comp.allOrders = [new Order(2, {} as User, new Date(), [])];
      expect(comp.allOrders.length).toBe(1);
      comp.ngOnInit();
      expect(comp.allOrders.length).toBe(0);
    });

  });
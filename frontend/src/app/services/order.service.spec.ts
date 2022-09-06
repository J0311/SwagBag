import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { Purchase } from '../models/purchase';
import { User } from '../models/user';
import { OrderService } from "./order.service";

describe("OrderService", () => {
  let service: OrderService;
  let HttpClientSpy: any;

  beforeEach(() => {
    HttpClientSpy = {
      get: jest.fn()
    }
    service = new OrderService(HttpClientSpy);
  });

  it('should test getOrders', (done) => {
    let product1: Product = {id: 1, name:"phone", quantity:1,price:50, description: "null", image: "null"};
    let product2: Product = {id: 2, name:"laptop", quantity:2,price:10, description: "null", image: "null"};
    let user!: User;
    let purchaseTime!: Date;
    let tempOrder!: Order;
    let purchase1: Purchase = {purchaseId :1, order: tempOrder, product: product1,quantity:1, pricePerItem:50};
    let purchase2: Purchase = {purchaseId :2, order: tempOrder, product: product2,quantity:1, pricePerItem:10};
    let purchaseList1: Purchase[] = [purchase1, purchase2];
    let purchaseList2: Purchase[] = [purchase1];
    let order: Order = {orderId: 1, user: user, purchaseTime: purchaseTime, purchases: purchaseList1};
    let order2: Order = {orderId: 2, user: user, purchaseTime: purchaseTime, purchases: purchaseList2};
    const res: Order[] = [order, order2];
    jest.spyOn(HttpClientSpy, 'get').mockReturnValue(of(res));
    service.getOrders().subscribe(
      {
        next: data => {
          expect(data).toEqual(res);
          done();
        }
      }
    );
    expect(HttpClientSpy.get).toBeCalledTimes(1);
  })
});

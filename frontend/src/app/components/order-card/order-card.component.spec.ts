import { OrderCardComponent } from "./order-card.component";
import { Order } from "../../models/order";
import { OrderService } from "../../services/order.service";
import { User } from "../../models/user";
import { Purchase } from "../../models/purchase";
import { Product } from "src/app/models/product";
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SimpleChange } from "@angular/core";
import {HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('OrderCardComponent', () => {
    
    let fixture: OrderCardComponent;
    let orderService: OrderService;

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

    let fixture1: ComponentFixture<OrderCardComponent>, orderTotal1: OrderCardComponent; 
       
   beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          declarations: [ OrderCardComponent ]
        });

        fixture1 = TestBed.createComponent(OrderCardComponent);
        orderTotal1 = fixture1.componentInstance;
  });

    beforeEach(() => {
        fixture = new OrderCardComponent(orderService);
        fixture.orderInfo = order;
    });


    it('should have order 0', () => {
        expect(fixture.orderTotal).toEqual(0);
    });

    it('check orderInfo render', () => {
        expect(fixture.orderInfo).toBeTruthy();
        expect(fixture.orderInfo.orderId).toEqual(1);
    });

    it('should return order total', () => {
        expect(fixture.ngOnChanges).toBeUndefined; 
        fixture.orderInfo = order2;
        expect(fixture.ngOnChanges).toBeTruthy;
    });

    it('should render `Hello World!`', () => {
        
        orderTotal1.orderInfo = order;

        orderTotal1.ngOnChanges({orderTotal : new SimpleChange(0, 60, true)});
        
        fixture1.detectChanges();
        expect(orderTotal1.orderTotal).toBe(60);
      });
 
}); 




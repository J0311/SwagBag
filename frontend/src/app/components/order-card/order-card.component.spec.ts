import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { Order } from '../../models/order';
import { Purchase } from '../../models/purchase';
import { OrderService } from '../../services/order.service';
import { OrderCardComponent } from './order-card.component';

describe('OrderCardComponent', () => {
  let fixture: ComponentFixture<OrderCardComponent>;
  let comp: OrderCardComponent;

  let user: User;
  let products: Product[];
  let purchases: Purchase[];
  let order: Order;

  beforeEach(() => {
    user = new User(0, '', '', '', '', '');
    order = new Order(0, user, new Date(), purchases);
    products = [
      new Product(0, '', 20, '', 10, ''),
      new Product(1, '', 20, '', 3.5, ''),
    ];
    purchases = [
      new Purchase(0, order, products[0], 2, products[0].price),
      new Purchase(1, order, products[1], 7, products[1].price),
    ];
    order.purchases = purchases;
    TestBed.configureTestingModule({
      declarations: [OrderCardComponent],
      providers: [{ provide: OrderService, useValue: {} }],
    });
    fixture = TestBed.createComponent(OrderCardComponent);
    comp = fixture.componentInstance;
    comp.orderInfo = order;
  });

  it('Should be initialized with the correct orderTotal', () => {
    // Act
    comp.ngOnChanges({});
    comp.ngOnInit();

    // Assert
    let expectedTotal = purchases
      .map((purchase) => purchase.pricePerItem * purchase.quantity)
      .reduce((prev, next) => prev + next);
    expect(comp.orderTotal).toBe(expectedTotal);
  });

  it('Should update orderTotal on input change', () => {
    // Arrange
    let newOrder = new Order(1, user, new Date(), purchases);
    let newPurchases = [
      new Purchase(2, newOrder, products[0], 3, 87.45),
      new Purchase(3, newOrder, products[1], 1, 12.94),
    ];
    newOrder.purchases = newPurchases;
    let expectedTotal = newPurchases
      .map((purchase) => purchase.pricePerItem * purchase.quantity)
      .reduce((prev, next) => prev + next);

    // Act
    comp.ngOnChanges({});
    comp.ngOnInit();
    comp.orderInfo = newOrder;
    comp.ngOnChanges({ orderInfo: new SimpleChange(order, newOrder, true) });
    fixture.detectChanges();

    // Assert
    expect(comp.orderTotal).toEqual(expectedTotal);
  });
});

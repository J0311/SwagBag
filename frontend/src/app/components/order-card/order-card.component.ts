import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit, OnChanges {

  @Input() orderInfo!: Order;
  orderTotal: number = 0;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      // Calculate the order total
      this.orderTotal = this.orderInfo.purchases
        .map(purchase => purchase.pricePerItem * purchase.quantity)
        .reduce((prev, next) => prev + next);
  }

}

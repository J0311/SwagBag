import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

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

  /**
   * When a change to an @Input is detected, update orderTotal
   * with the sum of all purchases in the order
   * 
   * @param changes A list of changed @Inputs
   */
  ngOnChanges(changes: SimpleChanges): void {
      this.orderTotal = this.orderInfo.purchases
        .map(purchase => purchase.pricePerItem * purchase.quantity)
        .reduce((prev, next) => prev + next);
  }

}

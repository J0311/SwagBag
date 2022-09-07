import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './display-orders.component.html',
  styleUrls: ['./display-orders.component.css'],
})
export class DisplayOrdersComponent implements OnInit {
  allOrders: Order[] = [];
  constructor(private orderService: OrderService) {}

  /**
   * On init, fetch all orders belonging to the current logged in user
   */
  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      (resp) => {
        this.allOrders = resp;
        console.log('Orders Retrieved');
      },
      (err) => {
        this.allOrders = [];
        console.log(err);
      }
    );
  }
}

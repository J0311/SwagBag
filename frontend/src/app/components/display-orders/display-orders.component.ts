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

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      // change with actual user id
      (resp) => {
        this.allOrders = resp;
        console.log(this.allOrders);
      },
      (err) => console.log(err),
      () => console.log('Orders Retrieved')
    );
  }
}

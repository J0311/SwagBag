import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {

  @Input() orderInfo!: Order;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    console.log("onInit called for OrderCardComponent");
  }

}

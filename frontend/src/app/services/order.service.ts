import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private productUrl: string = "/api/order/";

  constructor(private http: HttpClient) { }

  public getOrders(userId: number): Observable<Order[]> {
    let path = environment.baseUrl+this.productUrl+userId;
    console.log("Creating an HTTPRequest with path: " + path);
    return this.http.get<Order[]>(path, {headers: environment.headers, withCredentials: environment.withCredentials});
  }
}

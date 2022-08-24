import { Purchase } from "./purchase";
import { User } from "./user";

export class Order {
    orderId: number;
    user: User;
    purchaseTime: Date;
    purchases: Purchase[];

    constructor (orderId: number, user: User, purchaseTime: Date, purchases: Purchase[]) {
        this.orderId = orderId;
        this.user = user;
        this.purchaseTime = purchaseTime;
        this.purchases = purchases;
    }
}

import { Purchase } from "./purchase";
import { User } from "./user";

export class Order {
    id: number;
    user: User;
    purchaseTime: Date;
    purchases: Purchase[];

    constructor (id: number, user: User, purchaseTime: Date, purchases: Purchase[]) {
        this.id = id;
        this.user = user;
        this.purchaseTime = purchaseTime;
        this.purchases = purchases;
    }
}

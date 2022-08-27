import { Order } from "./order";
import { Product } from "./product";

export class Purchase {
    purchaseId: number;
    order: Order;
    product: Product;
    quantity: number;
    pricePerItem: number;

    constructor (purchaseId: number, order: Order, product: Product, quantity: number, pricePerItem: number) {
        this.purchaseId = purchaseId;
        this.order = order;
        this.product = product;
        this.quantity = quantity;
        this.pricePerItem = pricePerItem;
    }
}
import { Order } from "./order";
import { Product } from "./product";

export class Purchase {
    id: number;
    order: Order;
    product: Product;
    quantity: number;
    pricePerItem: number;

    constructor (id: number, order: Order, product: Product, quantity: number, pricePerItem: number) {
        this.id = id;
        this.order = order;
        this.product = product;
        this.quantity = quantity;
        this.pricePerItem = pricePerItem;
    }
}
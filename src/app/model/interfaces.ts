
export class IOrder {
    userId: string;
    orderId: string;
    order_qty: number;
    price: number;
    order_type: IOrderType;
}

export class IOrderType {
    id: number;
    name: string;
}

export class ISummary {
    order_qty: number;
    price: number;
    userOrders: string;
}

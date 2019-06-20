import { Injectable } from "@angular/core";
import { IOrder, ISummary } from '../model/interfaces';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';


@Injectable({
    providedIn: 'root'
})
export class OrderService {
    orders: IOrder[] = [];
    orderSummaryList : ISummary[] = [];
    private storedOrders = 'ORDERS_STORED';

    constructor(){}

    getOrders(): Observable<IOrder[]> {
        return of(this.getStoredValues());
    }

    addOrder(order: IOrder): Observable<IOrder[]> {
        this.orders = this.getStoredValues();
        this.orders.push(order);
        sessionStorage.setItem(this.storedOrders, JSON.stringify(this.orders));
        return of(this.orders);
    }

    deleteOrder(orderId: string): Observable<IOrder[]> {
        this.orders = this.getStoredValues();
        this.orders = this.orders.filter( o => o.orderId !== orderId);
        sessionStorage.setItem(this.storedOrders, JSON.stringify(this.orders));
        this.orderSummaryList = [];
        return of(this.orders);
    }

    getStoredValues(): IOrder[] {
        let temp = sessionStorage.getItem(this.storedOrders);
        return temp ? (JSON.parse(temp)) as IOrder[] : [];
    }

    getSummaryOrdersByType(typeId: number): Observable<ISummary[]> {
        this.orderSummaryList = [];
        this.orders = this.getStoredValues();
        this.orders.filter( item => item.order_type.id === typeId).forEach( orderItem => {
            this.addFilteredValue(orderItem);
        });
        (typeId === 1) ? this.orderSummaryList.sort(this.sortByNameDesc) : this.orderSummaryList.sort(this.sortByNameAsc);
        return of(this.orderSummaryList);
    }

    addFilteredValue(order: IOrder):void {
        let temp = this.orderSummaryList.find( item => item.price === order.price);
        if(temp) {
            temp.order_qty = parseFloat(temp.order_qty.toString()) + parseFloat(order.order_qty.toString());
            temp.price = order.price;
            temp.userOrders = temp.userOrders + '; ' + order.userId;
        }
        else {
            this.orderSummaryList.push({order_qty: order.order_qty, price: order.price, userOrders: order.userId})
        }
    }

    sortByNameDesc(a: ISummary, b: ISummary): number {
        if (parseFloat(a.price.toString()) < parseFloat(b.price.toString()))
          return 1;
        if (parseFloat(a.price.toString()) > parseFloat(b.price.toString()))
          return -1;
        return 0;
      }

      sortByNameAsc(a: ISummary, b: ISummary): number {
        if (parseFloat(a.price.toString()) < parseFloat(b.price.toString()))
          return -1;
        if (parseFloat(a.price.toString()) > parseFloat(b.price.toString()))
          return 1;
        return 0;
      }
}

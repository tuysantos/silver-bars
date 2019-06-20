import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IOrder } from 'src/app/model/interfaces';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  @Input() orderList: IOrder[] = [];
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  getOrderType(type: number): string {
    return type === 1 ? 'BUY' : 'SELL';
  }

  deleteOrder(orderId: string): void {
    confirm("Delete this order?") ? this.deleteEvent.emit(orderId) : '';
  }

  trackByFn(index, item) {
    return index;
  }
}

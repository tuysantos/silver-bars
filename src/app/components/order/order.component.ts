import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IOrder, IOrderType } from 'src/app/model/interfaces';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order: IOrder = {
    orderId: '0',
    userId: '',
    order_qty: null,
    price: 0,
    order_type: {id: 1,  name: 'BUY'}
  }

  orderTypes: IOrderType[] =  [
    {id: 1,  name: 'BUY'},
    {id: 2,  name: 'SELL'}
  ];
  orderTypeId: number = 0;

  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    this.order.orderId = this.generateGuid();
  }

  validateForm(): boolean {
    return this.order.userId.trim() !== '' && this.order.order_qty !== null && this.order.order_qty > 0 && this.order.price > 0;
  }

  setDefault(id: any): void {
    this.orderTypeId = id - 1;
  }

  saveOrder(): void {
    this.order.order_type = this.orderTypes[this.orderTypeId];
    this.validateForm() ?
    this.orderService.addOrder(this.order).pipe(take(1)).subscribe(items => this. cancelOrder()) : 
    this.invalidForm();
  }

  invalidForm(): void {
    alert("All fields are mandatory");
  }

  cancelOrder(): void {
    this.router.navigate(['/dashboard']);
  }

  s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateGuid(): string {
    let result = this.loopXTimes(2, true);
    result = `${result}${this.loopXTimes(1, true)}`;
    result = `${result}${this.loopXTimes(1, true)}`;
    result = `${result}${this.loopXTimes(1, true)}`;
    return `${result}${this.loopXTimes(3, false)}`;
  }

  loopXTimes(n: number, withDash: boolean): string {
    let result = "";
    for(let i=0; i< n; i++){
      result = result + this.s4();
    }
    return withDash ? `${result}-` : result;
  }
}

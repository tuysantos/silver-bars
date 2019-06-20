import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder, ISummary } from 'src/app/model/interfaces';
import { OrderService } from 'src/app/services/order.service';
import { Subscription } from 'rxjs';
import {  take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private subscription: Subscription;
  orderList: IOrder[] = [];
  orderSummary : ISummary[] = [];
  orderTypeId: number = 1;
  listTypeId: number = 1;
  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    this.subscription = this.orderService.getOrders().subscribe( orders => {
      this.orderList = orders;
      this.setOrderTypeEvent(this.orderTypeId);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addOrder(): void {
    this.router.navigate(['/order']);
  }

  deleteOrder(id: string): void {
    this.orderService.deleteOrder(id).pipe(take(1)).subscribe( orders => {
      this.orderList = orders;
      this.setOrderTypeEvent(this.orderTypeId);
    })
  }

  setOrderTypeEvent(orderTypeId: number): void {
    this.orderTypeId = orderTypeId;

    this.orderService.getSummaryOrdersByType(this.orderTypeId)
                      .pipe(take(1))
                      .subscribe( items => {
                        this.orderSummary = items;
                      });
  }

  setListTypeEvent(listTypeId: number): void {
    this.listTypeId = listTypeId;
  }
  
}

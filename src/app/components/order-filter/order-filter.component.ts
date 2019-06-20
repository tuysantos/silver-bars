import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-order-filter',
  templateUrl: './order-filter.component.html',
  styleUrls: ['./order-filter.component.scss']
})
export class OrderFilterComponent implements OnInit {

  orderType: number = 1;
  listType: number = 1;
  @Output() orderTypeEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() listTypeEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    
  }

  setOrderType(type: number): void {
    this.orderType = type;
    this.orderTypeEvent.emit(this.orderType);
  }

  setListType(type: number): void {
    this.listType = type;
    if((type===1) && (this.orderType ===2)){
      this.setOrderType(type);
    }
    this.listTypeEvent.emit(this.listType);
  }
}

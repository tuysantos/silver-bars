import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  @Input() summaryList: any[] = [];
  constructor() { }

  ngOnInit() {
  }

  trackByFn(index, item) {
    return index;
  }

}

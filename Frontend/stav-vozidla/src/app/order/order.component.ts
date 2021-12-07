import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  order = {
    orderId: 10,
    vin: "20",
    dateOfCreation: new Date(),
    dateOfUpdate: new Date(),
    vehicleName: "skoda",
    finishedServices: 0,
    unfinishedServices: 1,
    // services: []
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}

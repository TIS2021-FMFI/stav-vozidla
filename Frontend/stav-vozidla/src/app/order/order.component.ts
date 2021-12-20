import {AfterViewInit, Component, OnInit} from '@angular/core';
import {OrdersService} from "../orders.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Order} from "../order";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements AfterViewInit {


  order: Order
  // order = {
  //   orderId: 10,
  //   vin: "20",
  //   dateOfCreation: new Date(),
  //   dateOfUpdate: new Date(),
  //   vehicleName: "skoda",
  //   finishedServices: 0,
  //   unfinishedServices: 1,
  // }

  constructor(private ordersService: OrdersService, private route: ActivatedRoute,public router: Router) {
    this.route.queryParams.subscribe(params => {
      this.ordersService.getOrder(params['id']).subscribe(order => {
        this.order = order;
        this.order.finishedServices = this.order.services.filter(service => service.statusCode == '500').length
        this.order.unfinishedServices = this.order.services.filter(service => service.statusCode == '400').length
        this.order.services.forEach((service) => service.serviceName = service.serviceName.replace(new RegExp(".*_"), ''))
        this.order.services = this.order.services.sort(((a, b) => {
          if(!a.completionDate) return 1
          if(!b.completionDate) return -1
          return new Date(a.completionDate).getTime() - new Date(b.completionDate).getTime()
        }))
      })
    });
  }



  ngAfterViewInit(): void {

  }

  goToOrders() {
    this.router.navigate(['orders'])
  }
}

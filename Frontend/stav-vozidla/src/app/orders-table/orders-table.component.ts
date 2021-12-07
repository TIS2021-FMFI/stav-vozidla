import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Order} from "../order";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {OrdersService} from "../orders.service";

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  orders: Order[] = [];
  //   = [
  //   {orderId: 10, vin: "INV-123", dateOfCreation: new Date(), dateOfUpdate: new Date(), vehicleName: "skoda", finishedServices: 0, unfinishedServices: 1, services: []},
  //   {orderId: 11, vin: "INV-345", dateOfCreation: new Date(), dateOfUpdate: new Date(), vehicleName: "skoda", finishedServices: 0, unfinishedServices: 0, services: []},
  //   {orderId: 12, vin: "INV-789", dateOfCreation: new Date(), dateOfUpdate: new Date(), vehicleName: "skoda", finishedServices: 0, unfinishedServices: 5, services: []},
  //   {orderId: 13, vin: "INV-ABC", dateOfCreation: new Date(), dateOfUpdate: new Date(), vehicleName: "skoda", finishedServices: 0, unfinishedServices: 0, services: []},
  //   {orderId: 13, vin: "ABC", dateOfCreation: new Date(), dateOfUpdate: new Date(), vehicleName: "skoda", finishedServices: 0, unfinishedServices: 0, services: []},
  //   {orderId: 13, vin: "INV-DEF", dateOfCreation: new Date(), dateOfUpdate: new Date(), vehicleName: "skoda", finishedServices: 0, unfinishedServices: 0, services: []},
  //   {orderId: 13, vin: "INV-GHI", dateOfCreation: new Date(), dateOfUpdate: new Date(), vehicleName: "skoda", finishedServices: 0, unfinishedServices: 0, services: []},
  //   {orderId: 13, vin: "INV-WWW", dateOfCreation: new Date(), dateOfUpdate: new Date(), vehicleName: "skoda", finishedServices: 0, unfinishedServices: 0, services: []},
  // ]


  displayedColumns = ['select','vin', 'dateOfCreation', 'dateOfUpdate', 'vehicleName','finishedServices','unfinishedServices','finished'];
  selection = new SelectionModel<Order>(true, []);

  constructor(private ordersService: OrdersService) {


  }

  ngAfterViewInit(): void {
    this.ordersService.getOrdersForCurrentUser().subscribe(orders=> {
      this.orders = orders
      this.dataSource = new MatTableDataSource<Order>(this.orders);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
    })

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.filteredData.forEach(row => this.selection.select(row));
  }

  applyFilter(filterInput: any) {
    this.dataSource.filter = filterInput.value.trim().toLowerCase();
  }

  test() {
    console.log("test")
  }
}

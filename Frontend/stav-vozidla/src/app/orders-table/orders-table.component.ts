import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Order} from "../order";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {OrdersService} from "../orders.service";
import {Router} from "@angular/router";

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

  displayedColumns = ['select','vin', 'dateOfCreation', 'dateOfUpdate', 'vehicleName','finishedServices','unfinishedServices','finished'];
  selection = new SelectionModel<Order>(true, []);

  constructor(private ordersService: OrdersService, private router: Router) {
  }

  ngAfterViewInit(): void {
    this.ordersService.getOrdersForCurrentUser().subscribe(orders => {
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

  goToOrder(id :any) {
    this.router.navigate(['/order'], {queryParams : {id:id}})
  }

  export() {
    this.ordersService.export(this.selection.selected)
  }
}

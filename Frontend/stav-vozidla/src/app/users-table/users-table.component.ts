import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Order} from "../order";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {User} from "../user";
import {UserService} from "../user.service";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements AfterViewInit {
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['name', 'gefcoId', 'email', 'isAdmin', 'activate', 'edit'];
  users: User[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
    })
  }

  applyFilter(filterInput: any) {
    this.dataSource.filter = filterInput.value.trim().toLowerCase();
  }
}

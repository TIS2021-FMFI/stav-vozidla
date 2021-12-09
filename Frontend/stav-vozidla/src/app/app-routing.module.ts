import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {OrdersTableComponent} from "./orders-table/orders-table.component";
import {OrderComponent} from "./order/order.component";
import {UsersTableComponent} from "./users-table/users-table.component";
import {AddUserComponent} from "./add-user-dialog/add-user.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'orders', component: OrdersTableComponent},
  {path: 'order', component: AddUserComponent},
  {path: 'users', component: UsersTableComponent},
  {path: 'add-user', component: AddUserComponent},
  {path: 'modify-user', component: AddUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

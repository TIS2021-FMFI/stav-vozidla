import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {OrdersTableComponent} from "./orders-table/orders-table.component";
import {UsersTableComponent} from "./users-table/users-table.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {UserGuard} from "./guards/user-guard.service";

const routes: Routes = [
  {path: '', component: OrdersTableComponent, canActivate: [UserGuard]},
  {path: 'authentication', component: LoginComponent},
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

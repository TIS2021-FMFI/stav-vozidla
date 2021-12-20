import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {OrdersTableComponent} from "./orders-table/orders-table.component";
import {UsersTableComponent} from "./admin/users-table/users-table.component";
import {AddUserComponent} from "./admin/add-user/add-user.component";
import {UserGuard} from "./guards/user-guard.service";
import {ProfileComponent} from "./profile/profile.component";
import {OrderComponent} from "./order/order.component";
import {UserDeleteConfirmationComponent} from "./admin/user-delete-confirmation/user-delete-confirmation.component";

const routes: Routes = [
  {path: '', component: OrdersTableComponent, canActivate: [UserGuard]},
  {path: 'authentication', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'orders', component: OrdersTableComponent},
  {path: 'order', component: OrderComponent},
  {path: 'users', component: UsersTableComponent},
  {path: 'add-user', component: AddUserComponent},
  {path: 'delete-confirmation', component: UserDeleteConfirmationComponent},
  {path: 'modify-user', component: AddUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

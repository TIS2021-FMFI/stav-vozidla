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
import {PasswordResetComponent} from "./password-reset/password-reset.component";
import {GuestGuard} from "./guards/guest-guard.service";

const routes: Routes = [
  {path: '', component: OrdersTableComponent, canActivate: [UserGuard]},
  {path: 'password-reset', component: PasswordResetComponent},
  {path: 'authentication', component: LoginComponent, canActivate: [GuestGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [UserGuard]},
  {path: 'orders', component: OrdersTableComponent, canActivate: [UserGuard]},
  {path: 'order', component: OrderComponent, canActivate: [UserGuard]},
  {path: 'users', component: UsersTableComponent, canActivate: [UserGuard]},
  {path: 'add-user', component: AddUserComponent, canActivate: [UserGuard]},
  {path: 'delete-confirmation', component: UserDeleteConfirmationComponent, canActivate: [UserGuard]},
  {path: 'modify-user', component: AddUserComponent, canActivate: [UserGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

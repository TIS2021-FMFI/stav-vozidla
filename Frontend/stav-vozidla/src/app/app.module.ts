import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { OrdersTableComponent } from './orders-table/orders-table.component';
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import { OrderComponent } from './order/order.component';
import { TimelineComponent } from './timeline/timeline.component';
import { UsersTableComponent } from './admin/users-table/users-table.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import { ProfileComponent } from './profile/profile.component';
import { UserDeleteConfirmationComponent } from './admin/user-delete-confirmation/user-delete-confirmation.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    OrdersTableComponent,
    OrderComponent,
    TimelineComponent,
    UsersTableComponent,
    AddUserComponent,
    ProfileComponent,
    UserDeleteConfirmationComponent,
    PasswordResetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

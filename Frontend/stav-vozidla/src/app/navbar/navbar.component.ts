import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddUserComponent} from "../admin/add-user/add-user.component";
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  constructor(public router: Router, public authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  goToRoute(route: string, params: any) {
    this.router.navigate([route], {queryParams : params})
  }

  logout() {
    this.authenticationService.logout()
  }
}

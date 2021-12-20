import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  oldPassword: string;
  newPassword: string;


  constructor(private userService: UserService, private router:Router, public authenticationService: AuthenticationService) {

  }

  ngOnInit(): void {
  }

  changePassword() {
    // this.userService.addNewUser(this.name, this.email, "aaa",this.isAdmin, this.gefcoId)
    //   .subscribe(response => (this.router.navigate(['/users'])));
  }
}

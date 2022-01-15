import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  oldPassword: string;
  newPassword: string;


  constructor(private userService: UserService, private router:Router, public authenticationService: AuthenticationService, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
  }

  changePassword() {
    this.userService.changePassword(this.oldPassword, this.newPassword).subscribe({
      next: () => {
        this.oldPassword = ''
        this.newPassword = ''
        this.snackBar.open("Heslo bolo úspešne zmenené.", null, {duration: 3000})
      },
      error: ()=> {
        this.snackBar.open("Heslo sa nepodarilo zmeniť. Prosím uistite sa, že staré heslo je korektné.", null, {duration: 3000})

      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PasswordResetComponent} from "../password-reset/password-reset.component";
import {PasswordResetService} from "../password-reset/password-reset.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  emailReset: string = '';

  constructor(private authenticationService: AuthenticationService, private snackBar: MatSnackBar, private passwordResetService: PasswordResetService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    this.authenticationService.loginUser(this.email,this.password).subscribe({
      next: (user) => this.router.navigate(['/']),
      error: (error: HttpErrorResponse) => this.snackBar.open("Zadané prihlasovacie údaje neprislúchajú žiadnému účtu.", null, {duration: 3000})
    })
  }

  emailPasswordReset() {
    if(!this.emailReset) this.snackBar.open("Emailová adresa pre zaslanie hesla nebola vyplnená", null, {duration: 3000})

    this.passwordResetService.sendRequestForPasswordReset(this.emailReset).subscribe({
      next: () => {
        this.emailPasswordResetSuccess()
      },
      error: () => {
        this.snackBar.open("Účet s danou emailovou adresou neexistuje, alebo sa vyskytol nejaký iný problem. Kontaktujte nás.", null, {duration: 3000})
      }
    })
  }

  emailPasswordResetSuccess(){
    this.snackBar.open("Link pre reset hesla bol zaslaný na vami zadanú emailovú adresu. (ak daný účet existuje)", null, {duration: 3000})
    this.emailReset = '';
  }
}

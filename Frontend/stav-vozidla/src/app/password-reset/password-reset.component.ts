import { Component, OnInit } from '@angular/core';
import {PasswordResetService} from "./password-reset.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  newPassword: any;

  constructor(private passwordResetService: PasswordResetService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  changePassword() {
    this.route.queryParams.subscribe(params => {
      this.passwordResetService.resetPassword(this.newPassword, params['userId'], params['token']).subscribe(() => {
        this.router.navigate(['/authentication'])
      }, (error) => {
        this.snackBar.open("Heslo sa nepodarilo zmeniť", null, {duration: 3000})
      })
    });
  }
}

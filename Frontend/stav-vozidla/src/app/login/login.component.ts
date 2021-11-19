import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.authenticationService.loginUser(this.email,this.password)
  }
}

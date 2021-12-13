import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  name: string;
  email: string;
  gefcoId: string
  isAdmin: boolean = false;

  constructor(private userService: UserService, private router:Router) {

  }

  ngOnInit(): void {
  }

  createUser() {
    this.userService.addNewUser(this.name, this.email, "aaa",this.isAdmin, this.gefcoId)
      .subscribe(response => (this.router.navigate(['/users'])));
  }
}

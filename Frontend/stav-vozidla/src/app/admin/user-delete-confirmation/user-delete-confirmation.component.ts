import { Component, OnInit } from '@angular/core';
import {UserService} from "../../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-delete-confirmation',
  templateUrl: './user-delete-confirmation.component.html',
  styleUrls: ['./user-delete-confirmation.component.scss']
})
export class UserDeleteConfirmationComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  rejectDelete(){
    this.router.navigate(['users'])
  }

  confirmDelete(userId: number){
    this.userService.deleteUser(userId).subscribe(()=>{
      this.router.navigate(['users'])
    })
  }

}

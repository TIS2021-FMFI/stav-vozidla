import { Component, OnInit } from '@angular/core';
import {UserService} from "../../user.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-delete-confirmation',
  templateUrl: './user-delete-confirmation.component.html',
  styleUrls: ['./user-delete-confirmation.component.scss']
})
export class UserDeleteConfirmationComponent implements OnInit {

  constructor( public userService: UserService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  rejectDelete(){
    this.router.navigate(['users'])
  }

  confirmDelete(userId: number){
    this.userService.deleteUser(userId).subscribe(()=>{
      this.snackBar.open("Používateľ bol úspešne vymazaný.", null, {duration: 3000})
      this.router.navigate(['users'])
    }, () => {
      this.snackBar.open("Používateľa sa nepodarilo vymaza''.", null, {duration: 3000})
    })
  }

}

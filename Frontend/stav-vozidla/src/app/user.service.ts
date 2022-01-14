import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Order} from "./order";
import {environment} from "../environments/environment";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userToDelete: User

  constructor(private http: HttpClient) { }

  addNewUser(name: string, email: string, password: string, isAdmin: boolean, idGefco: string){
    return this.http.post(environment.apiUrl + '/api/users', {
      name: name,
      email:email,
      password: password,
      admin: isAdmin,
      idGefco: idGefco
    }, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    })
  }

  getUsers(){
    return this.http.get<User[]>(environment.apiUrl + '/api/users', {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    })
  }

  deleteUser(userId: number){
    return this.http.delete(environment.apiUrl + '/api/users/' + userId,{
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    })
  }
}

import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private http: HttpClient) { }

  sendRequestForPasswordReset(email: string){
    return this.http.post(environment.apiUrl + '/api/password-reset', {
      email: email
    },{
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    })
  }

  resetPassword(newPassword: string, userId: string, token: string){
    return this.http.post(environment.apiUrl + '/api/password-reset/' + userId + '/' + token, {
      password: newPassword
    },{
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    })
  }

}

import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  loginUser(email: string, password: string) {
    this.http.post(environment.appUrl + '/api/login', {
      email: email,
      password: password
    }, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    }).subscribe()
  }
}

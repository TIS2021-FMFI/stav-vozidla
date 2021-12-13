import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./user";
import {map, shareReplay, tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: User;
  checkIfSignedInRequest: Observable<User>;

  constructor(private http: HttpClient) {
    this.checkIfSignedInRequest = this.getLoggedInUserRequest();
    this.getLoggedInUserRequest().pipe(tap(user => this.user = user)).subscribe();
  }

  getLoggedInUserRequest() {
    return this.http.get<User>(environment.appUrl + '/api/users/logged-user', {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    }).pipe(shareReplay(1));
  }


  loginUser(email: string, password: string) {
    this.http.post<User>(environment.appUrl + '/api/login', {
      email: email,
      password: password
    }, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    }).pipe(tap((user: User) => this.user = user)).subscribe()
  }
}

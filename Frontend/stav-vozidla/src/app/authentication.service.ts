import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./user";
import {map, shareReplay, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: User;
  checkIfSignedInRequest: Observable<User>;

  constructor(private http: HttpClient,private router: Router) {
    this.checkIfSignedInRequest = this.getLoggedInUserRequest();
    this.getLoggedInUserRequest().pipe(map(user => this.user = user)).subscribe();
  }

  getLoggedInUserRequest() {
    return this.http.get<User>(environment.apiUrl + '/api/users/logged-user', {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    }).pipe(shareReplay(1));
  }


  loginUser(email: string, password: string) {
    this.http.post<User>(environment.apiUrl + '/api/login', {
      email: email,
      password: password
    }, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    }).pipe(map((user: User) => {
      this.user = user
    })).subscribe((a) => this.router.navigate(['/']))
  }

  logout() {
    this.http.post<User>(environment.apiUrl + '/api/logout', {}, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    }).subscribe(() => window.location.href = environment.appUrl)

  }
}

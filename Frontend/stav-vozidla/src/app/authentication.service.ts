import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./user";
import {map, shareReplay, tap} from "rxjs/operators";
import {Observable, Observer} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: Observable<User>;

  constructor(private http: HttpClient,private router: Router) {
    this.recheckStatus()
  }

  recheckStatus(){
    this.user = this.getStatus();
    this.user.subscribe()
  }

  getStatus() {
    return this.http.get<User>(environment.apiUrl + '/api/users/logged-user', {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    }).pipe(shareReplay(1));
  }


  loginUser(email: string, password: string) {
    return this.http.post<User>(environment.apiUrl + '/api/login', {
      email: email,
      password: password
    }, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    }).pipe(tap((loggedUser) => this.user = new Observable<User>((observer: Observer<User>) =>{
      observer.next(loggedUser)
    }).pipe(shareReplay(1))))
  }

  logout() {
    this.http.post(environment.apiUrl + '/api/logout', {}, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    }).subscribe(() => window.location.href = environment.appUrl)

  }
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../authentication.service";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(public authenticationService: AuthenticationService, public router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authenticationService.user) return this.router.navigate(['/orders']);
    else {
      return this.authenticationService.checkIfSignedInRequest.pipe(map(value => value != null), tap(value => {
        this.router.navigate(['/orders'])
      }), catchError(err => this.router.navigate(['/authentication'])));
    }

  }
}

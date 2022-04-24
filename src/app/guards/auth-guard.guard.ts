import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private AuthService: AuthService, private _router: Router) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  if(localStorage.getItem("token")){
    if (localStorage.getItem("isLoggedIn")) {
      return true;
    }
  }
    this._router.navigate(['/login'])
    return false;
  }

}
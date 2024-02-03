import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router){

    }
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const jwtHelper = new JwtHelperService();
      const token = localStorage.getItem('token');

      if (token && !jwtHelper.isTokenExpired(token)) {
        return true;
      }
      localStorage.removeItem('token');
      // this.router.navigate(['http://intranet2.cecso.com.mx/ErpWeb2012/MENU/MENUweb/astiloginerp.aspx']);
      return false;
    }
  }

import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import jwtDecode from "jwt-decode";
import {Token} from "../Interfaces/token";

@Injectable({
  providedIn: 'root'
})
export class RoleguardService implements CanActivate{

  constructor() { }

  /*
    Method used to guard deciding if a specific route can be activated depending on if
    the requirements are met
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = localStorage.getItem('token');
    if (token) {
      let decodedToken = jwtDecode(token) as Token;
      let currentDate = new Date();
    if (decodedToken.exp) {
    let expiry = new Date(decodedToken.exp*1000);
    if (currentDate<expiry && decodedToken.role=='Admin') {
          return true;
        }
      }
    }
    alert("You're not an admin")
    return false;
  }
}



import { Injectable } from '@angular/core';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
@Injectable({ providedIn: 'root' })
export class AuthService {




  constructor(public jwtHelper: JwtHelperService) {}


  public isAuthenticated(): boolean {
    console.log (localStorage['token']);
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    // @ts-ignore
    return !this.jwtHelper.isTokenExpired(token);
  }
}

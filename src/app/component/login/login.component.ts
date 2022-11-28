import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../../services/http.service";
// @ts-ignore
import jwtDecode from "jwt-decode";


class Token {
  role?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  constructor(private http: HttpService, private router: Router) {

  }
  activeClass=false;
  password: any;
  username: any;

  ngOnInit(): void {
  }

  toggleClass(){
    this.activeClass=!this.activeClass
  }



  async login() {
    let dto = {
      username: this.username,
      password: this.password
    }
    this.http.login(dto).then(token => {
      console.log(token);
      localStorage.setItem('token', token)
      let decodedToken = jwtDecode(token) as Token;
      if (decodedToken.role == 'Admin') {
        this.router.navigate(['/mainview']);
      } else if (decodedToken.role == 'Customer') {
        this.router.navigate(['/createSales']);
      }else if (decodedToken.role != 'Admin' || 'Customer'){
        this.router.navigate(['/login'])
      }
    })
  }
}

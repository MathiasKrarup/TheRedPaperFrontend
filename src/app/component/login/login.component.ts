import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../../services/http.service";
// @ts-ignore
import jwtDecode from "jwt-decode";


class Token {
  role?: string;
  id?: string;
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
  firstName: any;
  lastName: any;
  email: any;
  phoneNumber: any;
  birthDay: any;
  location: any;


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
    var token = await this.http.login(dto)
      localStorage.setItem('token', token)
      let decodedToken = jwtDecode(token) as Token;
      if (decodedToken.role == 'Admin') {
        this.router.navigate(['/mainview']);
      } else if (decodedToken.role == 'Customer') {
        this.router.navigate(['/createSales']);
      }else if (decodedToken.role != 'Admin' || 'Customer'){
        this.router.navigate(['/login'])
      }
  }

  async createUser() {
    let dto = {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      password: this.password,
      birthDay: this.birthDay,
      email: this.email,
      phoneNumber: this.phoneNumber,
      location: this.location
    }
    const result = await this.http.createUser(dto);
    console.log(result)
  }
}

import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
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



  constructor(private http: AuthService, private router: Router) {

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
    if (!this.username) {
      alert("Remember to enter your username")
    }
    else if (!this.password){
      alert("Remember to enter your password")
    }
    else {
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
      } else if (decodedToken.role != 'Admin' || 'Customer') {
        this.router.navigate(['/login'])
      }
    }
  }

  async createCustomer() {
    if (!this.firstName){
      alert("Remember to enter your first name")
    }
    else if(!this.lastName){
      alert("Remember to enter your last name")
    }
    else if (!this.username){
      alert("Remember to enter your username")
    }
    else if (!this.password){
      alert("Remember to enter your password")
    }
    else if (!this.birthDay){
      alert("Remember to enter your birthday")
    }
    else if (!this.email){
      alert("Remember to enter your email")
    }
    else if (!this.phoneNumber || this.phoneNumber.length < 8){
      alert("Remember to either type your phoneNumber. A phoneNumber has to be atleast 8 numbers")
    }
    else if (!this.location){
      alert("Remember to type your location")
    }
    else {
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
      const result = await this.http.createCustomer(dto);
      alert("You succesfully created a new account");
    }
  }

}

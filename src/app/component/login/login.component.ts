import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
// @ts-ignore
import jwtDecode from "jwt-decode";
import {reload} from "../../../services/axios";



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


  /**
   * Logs the user into the program and sets the token which is used in other routes of the program,
   * if the user logs in succesfully. After the token is sat the decoced token is used to check the user's role.
   * If the user is an admin, then they're navigated to the adminview and if the role is Customer, then they're
   * navigated to the mainview. If no role is found then they're navigated to /login.
    */
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
      reload();
      let decodedToken = jwtDecode(token) as Token;
      if (decodedToken.role == 'Admin') {
        this.router.navigate(['/mainview']);
      } else if (decodedToken.role == 'Customer') {
        this.router.navigate(['/mainview']);
      }else if (decodedToken.role != 'Admin' || 'Customer'){
        this.router.navigate(['/login'])
      }
      }
    }


  /**
   * Creates/Register a new user with the role customer
   */
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



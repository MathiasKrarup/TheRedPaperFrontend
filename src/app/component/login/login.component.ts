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


  /**
   * Logs the user into the program and sets the token which is used in other routes of the program,
   * if the user logs in succesfully. After the token is sat the decoced token is used to check the user's role.
   * If the user is an admin, then they're navigated to the adminview and if the role is Customer, then they're
   * navigated to the mainview. If no role is found then they're navigated to /login.
    */
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
        this.router.navigate(['/mainview']);
      }else if (decodedToken.role != 'Admin' || 'Customer'){
        this.router.navigate(['/login'])
      }
  }

  /**
   * Creates/Register a new user with the role customer
   */
  async createCustomer() {
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

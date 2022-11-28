import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../services/http.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  constructor(private http: HttpService) {

  }
  activeClass=false;
  email: any;
  password: any;

  ngOnInit(): void {
  }

  toggleClass(){
    this.activeClass=!this.activeClass
  }


  login() {
    let dto = {
      email: this.email,
      password: this.password
    }
    var token = this.http.login(dto);
    console.log(token);
  }
}

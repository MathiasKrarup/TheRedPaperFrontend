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
    var token = await this.http.login(dto);
    localStorage.setItem('token', token)
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  constructor() {

  }
  activeClass=false;

  ngOnInit(): void {
  }

  toggleClass(){
    this.activeClass=!this.activeClass
  }



}

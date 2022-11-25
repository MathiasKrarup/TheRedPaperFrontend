import {Component, Input, OnInit} from '@angular/core';
import {style} from "@angular/animations";
import {NavigationEnd, Router} from "@angular/router";
import * as events from "events";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  currentRoute: string = "";
  constructor(private router: Router) {
    // @ts-ignore
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // @ts-ignore
        this.currentRoute = event.url;
        // @ts-ignore
        console.log(event.url);
      }
    });
    console.log(this.currentRoute)
  }

  ngOnInit(): void {
  }
  @Input() collapsed = false;
  @Input() screenWidth = 0;


  getBodyClass(): string {
    let styleClass = '';
    if (this.currentRoute == '/login' || this.currentRoute == '/') {
    styleClass = 'reset-this-root';
    }
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }
}

import { Component } from '@angular/core';
import {Router} from "@angular/router";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TheRedPaperFrontend';

  isSideNavCollapsed = false;
  screenWidth = 0;


  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  constructor(public router: Router) {
  }
}

import {InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule, Routes} from "@angular/router";
import { MainviewComponent } from './component/mainview/mainview.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { CreationsComponent } from './component/creations/creations.component';
import { BodyComponent } from './component/body/body.component';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";



const routes: Routes = [{
  path: 'mainview', component: MainviewComponent
},
  {
  path: 'login', component: LoginComponent
},
  {path: 'createSales', component: CreationsComponent}, {
  path: '', redirectTo: 'login', pathMatch: "full"
}]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainviewComponent,
    SidenavComponent,
    CreationsComponent,
    BodyComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [AuthService, AuthService, JwtHelperService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule, Routes} from "@angular/router";
import { MainviewComponent } from './component/mainview/mainview.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { CreationsComponent } from './component/creations/creations.component';
import { BodyComponent } from './component/body/body.component';


const routes: Routes = [{
  path: 'mainview', component: MainviewComponent
},
  {
  path: 'login', component: LoginComponent
}, {
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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

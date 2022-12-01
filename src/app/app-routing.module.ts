import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./component/login/login.component";
import {MainviewComponent} from "./component/mainview/mainview.component";
import {CreationsComponent} from "./component/creations/creations.component";
import {AuthGuardService} from "../services/auth-guard.service";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'mainview', component: MainviewComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

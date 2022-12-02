import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./component/login/login.component";
import {MainviewComponent} from "./component/mainview/mainview.component";
import {CreationsComponent} from "./component/creations/creations.component";
import {AuthGuardService} from "../services/auth-guard.service";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {AdminviewComponent} from "./component/adminview/adminview.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'mainview', component: MainviewComponent},
  {path: 'adminview', component: AdminviewComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatTableModule, MatPaginatorModule, MatSortModule],

  exports: [RouterModule]
})
export class AppRoutingModule { }

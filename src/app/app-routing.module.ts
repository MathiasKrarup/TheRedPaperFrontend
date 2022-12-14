import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./component/login/login.component";
import {MainviewComponent} from "./component/mainview/mainview.component";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {AdminviewComponent} from "./component/adminview/adminview.component";
import {CreateProductComponent} from "./component/create-product/create-product.component";
import {ProductListComponent} from "./component/product-list/product-list.component";
import {AuthguardService} from "../services/authguard.service";
import {RoleguardService} from "../services/roleguard.service";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'createSales', component: CreateProductComponent, canActivate: [AuthguardService]},
  {path: 'adminview', component: AdminviewComponent, canActivate: [RoleguardService]},
  {path: 'mainview', component: ProductListComponent, canActivate: [AuthguardService]},
  {path: '', redirectTo: 'login', pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatTableModule, MatPaginatorModule, MatSortModule],

  exports: [RouterModule]
})
export class AppRoutingModule { }

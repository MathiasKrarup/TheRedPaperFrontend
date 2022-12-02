import {InjectionToken, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule, Routes} from "@angular/router";
import { MainviewComponent } from './component/mainview/mainview.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { BodyComponent } from './component/body/body.component';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {AdminviewComponent} from "./component/adminview/adminview.component";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDialog} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { CreateProductComponent } from './component/create-product/create-product.component';
import {MatButtonModule} from "@angular/material/button";
import { ProductInfoComponent } from './component/product-info/product-info.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";



const routes: Routes = [
  {path: 'login', component: LoginComponent},

  {path: 'createSales', component: CreateProductComponent},

  {path: 'adminview', component: AdminviewComponent},

  {path: 'mainview', component: ProductListComponent},



  {path: '', redirectTo: 'login', pathMatch: "full"}]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainviewComponent,
    SidenavComponent,
    BodyComponent,
    AdminviewComponent,
    CreateProductComponent,
    ProductInfoComponent,
    ProductListComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    CdkTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
  ],

  schemas: [NO_ERRORS_SCHEMA],

  exports: [MatTableModule],
  providers: [AuthService, AuthService, JwtHelperService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS }],
  bootstrap: [AppComponent]
})
export class AppModule { }

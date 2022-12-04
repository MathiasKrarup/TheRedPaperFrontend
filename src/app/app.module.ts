import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule, Routes} from "@angular/router";
import { MainviewComponent } from './component/mainview/mainview.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { BodyComponent } from './component/body/body.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminviewComponent} from "./component/adminview/adminview.component";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { CreateProductComponent } from './component/create-product/create-product.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import { DialogComponent } from './component/dialog/dialog.component';
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";


const routes: Routes = [{
  path: 'mainview', component: MainviewComponent
},
  {
  path: 'login', component: LoginComponent
},
  {path: 'createSales', component: CreateProductComponent},

  {path: 'adminview', component: AdminviewComponent},

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
    DialogComponent
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
    MatDialogModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule
  ],
  entryComponents: [DialogComponent],


  exports: [MatTableModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule, Routes} from "@angular/router";
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
import { ProductListComponent } from './component/product-list/product-list.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {RoleguardService} from "../services/roleguard.service";
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { CustomersProductsComponent } from './component/customers-products/customers-products.component';
import { EditProductComponent } from './component/edit-product/edit-product.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderListComponent } from './component/order-list/order-list.component';
import {AuthguardService} from "../services/authguard.service";
import { FilterPipe } from './component/PipeFilter/filter.pipe';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { EmailComponent } from './component/email/email.component';
import { EditPasswordComponent } from './component/edit-password/edit-password.component';



const routes: Routes = [
  {path: 'login', component: LoginComponent},

  {path: 'createSales', component: CreateProductComponent, canActivate: [AuthguardService]},

  {path: 'adminview', component: AdminviewComponent, canActivate: [RoleguardService]},

  {path: 'mainview', component: ProductListComponent, canActivate: [AuthguardService]},

  {path: 'myProducts', component: CustomersProductsComponent, canActivate: [AuthguardService]},

  {path: 'cart', component: CartComponent, canActivate: [AuthguardService]},

  {path: 'orderlist', component: OrderListComponent, canActivate: [AuthguardService]},

  {path: '', redirectTo: 'login', pathMatch: "full"}]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    BodyComponent,
    AdminviewComponent,
    CreateProductComponent,
    DialogComponent,
    ProductListComponent,
    CustomersProductsComponent,
    EditProductComponent,
    ProductDetailsComponent,
    CartComponent,
    OrderListComponent,
    FilterPipe,
    EmailComponent,
    EditPasswordComponent
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
    ReactiveFormsModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    FlexLayoutModule,
    HttpClientModule,
    AutocompleteLibModule
  ],
  entryComponents: [DialogComponent],


  exports: [MatTableModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

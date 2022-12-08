import { Component, OnInit } from '@angular/core';
import {userService} from "../../../services/user.service";
import {ProductService} from "../../../services/product.service";
import jwtDecode from "jwt-decode";
import {Token} from "../../../Interfaces/token";
import {MatDialog} from "@angular/material/dialog";
import {EditProductComponent} from "../edit-product/edit-product.component";

@Component({
  selector: 'app-customers-products',
  templateUrl: './customers-products.component.html',
  styleUrls: ['./customers-products.component.scss']
})
export class CustomersProductsComponent implements OnInit {

  productList : any[] = []

  productName: string = "";
  price: number = 0;
  description: string = "";
  imageUrl: string = "";

  constructor(private http : ProductService, private dialog: MatDialog) { }

  async ngOnInit() {
    let token = localStorage.getItem('token');
    console.log(token)
    if (!token)
      return console.log("There was no matching token found")
    let decodedToken = jwtDecode(token) as Token;

    this.productList = await this.http.getProductsFromUser(decodedToken.id);
  }

  openEditProduct(item: any) {
    let dialogRef = this.dialog.open(EditProductComponent, {
      data: {
        products: this.productList,
        item: item
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.productList[this.productList.findIndex(item => item.id == result.id)] = result;
      }
    });
  }

  async deleteProduct(id) {
    const product = await this.http.deleteProduct(id);
    this.productList = this.productList.filter(item => item.id != product.id)
    await this.ngOnInit();
  }
}

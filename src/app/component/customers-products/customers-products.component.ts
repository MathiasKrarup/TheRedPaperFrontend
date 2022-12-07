import { Component, OnInit } from '@angular/core';
import {userService} from "../../../services/user.service";
import {ProductService} from "../../../services/product.service";
import jwtDecode from "jwt-decode";
import {Token} from "../../../Interfaces/token";

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

  constructor(private http : ProductService) { }

  async ngOnInit() {
    let token = localStorage.getItem('token');
    console.log(token)
    if (!token)
      return console.log("There was no matching token found")
    let decodedToken = jwtDecode(token) as Token;

    this.productList = await this.http.getProductsFromUser(decodedToken.id);
  }

  openEditProduct(item: any) {

  }

  deleteProduct(id) {

  }
}

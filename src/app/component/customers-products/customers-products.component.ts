import { Component, OnInit } from '@angular/core';
import {userService} from "../../../services/user.service";
import {ProductService} from "../../../services/product.service";

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
    //this.productList = await this.http.getProductsFromUser();
  }

  openEditProduct(item: any) {

  }

  deleteProduct(id) {

  }
}

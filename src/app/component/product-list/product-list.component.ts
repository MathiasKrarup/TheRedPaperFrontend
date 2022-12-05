import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../services/http.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList : any[] = []
  productName : string = "";
  imageUrl : string = "";
  price : number = 0;

  sortby: 'default' | 'htl' | 'lth' = 'default'
  constructor(private http: HttpService) { }

  async ngOnInit(){
    this.productList = await this.http.getAllProducts();
  }


  getProductById(id:number){
    this.http.getProductById(id);
  }

  async sortingDefault(){
    this.productList = await this.http.getAllProducts();
  }

 async sortingByHighToLow(){
     this.productList = await this.http.sortingByHighToLow();
  }

  async sortingByLowToHigh(){
    this.productList = await this.http.sortingByLowToHigh();
  }
}

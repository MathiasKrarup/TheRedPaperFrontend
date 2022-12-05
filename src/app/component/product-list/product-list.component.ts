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

  sortby: 'default' | 'htl' | 'lth' | 'atz' | 'zta' = 'default'
  constructor(private http: HttpService) { }

  async ngOnInit(){
    this.productList = await this.http.getAllProducts();
  }


  getProductById(id:number){
    this.http.getProductById(id);
  }

  async sortingDefault(){
    this.productList = await this.http.getAllProducts();
    this.sortby = 'default';
  }

 async sortingByHighToLow(){
     this.productList = await this.http.sortingByHighToLow();
     this.sortby = 'htl';
  }

  async sortingByLowToHigh(){
    this.productList = await this.http.sortingByLowToHigh();
    this.sortby = 'lth';
  }

  async sortingByAToZ(){
    this.productList = await this.http.sortingByAToZ();
    this.sortby = 'atz';
  }

  async sortingByZToA(){
    this.productList = await this.http.sortingByZToA();
    this.sortby = 'zta';
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from "../../../services/http.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  @Input() view: 'grid' | 'list' = 'list';

  productList : any[] = []
  ProductName : string = "";
  ImageUrl : string = "";
  Description : string = "";
  Price : number = 0;
  //ProductCondition : object = ;
  //SubCategory : object = ;
  SubCategoryId : number = 0;

  constructor(private http: HttpService, private router: ActivatedRoute) { }

  async ngOnInit(){
    this.productList = await this.http.getProducts();
  }


  getProductById(id:number){
    this.http.getProductById(id)
  }

}

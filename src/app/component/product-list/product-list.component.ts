import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {MatDialog} from "@angular/material/dialog";

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
  constructor(private http: ProductService, private dialog: MatDialog) { }

  async ngOnInit(){
    this.productList = await this.http.getAllProducts();
  }


  openDialog(item: any){
    let dialogRef = this.dialog.open(ProductDetailsComponent, {
      data: {
        products: this.productList,
        item: item}});
    dialogRef.afterClosed().subscribe(result=>{
      console.log("Dialog closed");
      if (result != null){
        this.productList[this.productList.findIndex(item => item.id == result.id)] = result;
      }
    });
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

import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Category} from "../../../Interfaces/category";
import {Subcategory} from "../../../Interfaces/subcategory";
import {Product} from "../../../Interfaces/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  subCategorylist: Subcategory[]
  categorylist!: Category[]
  productList!: Product[]
  productName : string = "";
  imageUrl : string = "";
  price : number = 0;
  selectedCategory!: string;

  selectedSubCategory!: string;

  sortby: 'default' | 'htl' | 'lth' | 'atz' | 'zta' = 'default'
  constructor(private http: ProductService) { }

  async ngOnInit(){
    this.productList = await this.http.getAllProducts();
    this.loadCategories()
  }


  getProductById(id:number){
    this.http.getProductById(id);
  }

  OnSubCategorySelected(selectedSubId: any){
  this.http.getAllProductsFromSubId(selectedSubId).subscribe(data => {
  this.productList = data
  console.log(data)
})

}
  async sortingDefault(){
    this.productList = await this.http.getAllProducts();
    this.sortby = 'default';
  }

 async sortingByHighToLow(){
   this.productList.sort((a, b) => (a.price > b.price ? -1 : 1));
     this.sortby = 'htl';
  }

  async sortingByLowToHigh(){
    this.productList.sort((a, b) => (a.price < b.price ? -1 : 1));
    this.sortby = 'lth';
  }

  async sortingByAToZ(){
    this.productList.sort((a, b) => (a.productName < b.productName ? -1 : 1));
    this.sortby = 'atz';
  }

  async sortingByZToA(){
    this.productList.sort((a, b) => (a.productName > b.productName ? -1 : 1));
    this.sortby = 'zta';
  }
  private loadCategories(){
    this.http.getCategoriesObservable().subscribe(data => {
      this.categorylist = data
      console.log(data)
    })
  }
  onCategorySelected(selectedCategoryId: any){
    this.http.getSubCategoriesFromCategory(selectedCategoryId).subscribe(data => {
      this.subCategorylist = data
      console.log(data)
    })
  }
}

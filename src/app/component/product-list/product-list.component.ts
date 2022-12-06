import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Category} from "../../../Interfaces/category";
import {Subcategory} from "../../../Interfaces/subcategory";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  subCategorylist: Subcategory[]
  categorylist!: Category[]
  productList : any[] = []
  productName : string = "";
  imageUrl : string = "";
  price : number = 0;
  selectedCategory!: string;

  sortby: 'default' | 'htl' | 'lth' | 'atz' | 'zta' = 'default'
  constructor(private http: ProductService) { }

  async ngOnInit(){
    this.productList = await this.http.getAllProducts();
    this.loadCategories()
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

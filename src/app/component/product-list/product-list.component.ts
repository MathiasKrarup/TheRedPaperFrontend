import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {MatDialog} from "@angular/material/dialog";
import {Category} from "../../../Interfaces/category";
import {Subcategory} from "../../../Interfaces/subcategory";
import {Product} from "../../../Interfaces/product";
import {CartService} from "../../../services/cart.service";
import {MatPaginator} from "@angular/material/paginator";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  keyword = 'productName'
  subCategorylist: Subcategory[]
  categorylist!: Category[]
  productList!: Product[]
  selectedCategory!: string;

  selectedSubCategory!: string;
  currentItemsToShow = [];


  searchKey: string = "";
  searchTerm: string = "";
  searching = new BehaviorSubject<string>("");
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sortby: 'default' | 'htl' | 'lth' | 'atz' | 'zta' = 'default'
  totalItem: number = 0;

  constructor(private http: ProductService, private dialog: MatDialog, private cartService: CartService) {
  }

  async ngOnInit() {
    this.productList = await this.http.getAllProducts();
    this.loadCategories()

    this.currentItemsToShow = this.productList.slice(0, 6)

    this.productList.forEach((a: any) => {
      Object.assign(a, {quantity: 1, total: a.price});
    })
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;
      })
    this.searching.subscribe(val => {
      this.searchKey = val;
    })
  }


  openDialog(item: any) {
    let dialogRef = this.dialog.open(ProductDetailsComponent, {
      data: {
        products: this.productList,
        item: item
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog closed");
      if (result != null) {
        this.productList[this.productList.findIndex(item => item.id == result.id)] = result;
      }
    });
  }

  getProductById(id: number) {
    this.http.getProductById(id);
  }

  OnSubCategorySelected(selectedSubId: any) {
    this.http.getAllProductsFromSubId(selectedSubId).subscribe(data => {
      this.productList = data
      this.currentItemsToShow = this.productList
    })

  }

  async sortingDefault() {
    this.productList = await this.http.getAllProducts();
    this.currentItemsToShow = this.productList.slice(0, 6)
    this.sortby = 'default';
  }

  async sortingByHighToLow() {
    this.productList.sort((a, b) => (a.price > b.price ? -1 : 1));
    this.currentItemsToShow = this.productList.slice(0, 6)
    this.sortby = 'htl';
  }

  async sortingByLowToHigh() {
    this.productList.sort((a, b) => (a.price < b.price ? -1 : 1));
    this.currentItemsToShow = this.productList.slice(0, 6)
    this.sortby = 'lth';
  }

  async sortingByAToZ() {
    this.productList.sort((a, b) => (a.productName < b.productName ? -1 : 1));
    this.currentItemsToShow = this.productList.slice(0, 6)
    this.sortby = 'atz';
  }

  async sortingByZToA() {
    this.productList.sort((a, b) => (a.productName > b.productName ? -1 : 1));
    this.currentItemsToShow = this.productList.slice(0, 6)
    this.sortby = 'zta';
  }

  private loadCategories() {
    this.http.getCategoriesObservable().subscribe(data => {
      this.categorylist = data

    })
  }

  onCategorySelected(selectedCategoryId: any) {
    this.http.getSubCategoriesFromCategory(selectedCategoryId).subscribe(data => {
      this.subCategorylist = data
    })
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  onPageChange($event) {
    this.currentItemsToShow = this.productList.slice($event.pageIndex * $event.pageSize,
      $event.pageIndex * $event.pageSize + $event.pageSize);
  }

    search(event:any)
    {
      console.log(event)
      this.searchTerm = (event.target as HTMLInputElement).value;
      this.searching.next(this.searchTerm);
      return this.searchTerm;
    }


}


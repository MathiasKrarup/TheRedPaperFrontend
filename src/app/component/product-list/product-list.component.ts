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


  searchKey: string = "";
  searchTerm: string = "";
  searching = new BehaviorSubject<string>("");
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sortby: 'default' | 'htl' | 'lth' | 'atz' | 'zta' = 'default'
  totalItem: number = 0;

  constructor(private http: ProductService, private dialog: MatDialog, private cartService: CartService) {
  }

  async ngOnInit() {
    localStorage.getItem('token')
    this.productList = await this.http.getAllProducts();
    this.loadCategories()
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

  // This method opens the ProductDetails component as a pop up dialog
  openDialog(item: any) {
    let dialogRef = this.dialog.open(ProductDetailsComponent, {
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
  // This method gets the product by id
  getProductById(id: number) {
    this.http.getProductById(id);
  }
  // This method shows all the products from the subcategory selected
  OnSubCategorySelected(selectedSubId: any) {
    this.http.getAllProductsFromSubId(selectedSubId).subscribe(data => {
      this.productList = data
    })

  }
  // This method shows the default
  async sortingDefault() {
    this.productList = await this.http.getAllProducts();
    this.sortby = 'default';
  }
  // This method sorts the price from high to low
  async sortingByHighToLow() {
    this.productList.sort((a, b) => (a.price > b.price ? -1 : 1));
    this.sortby = 'htl';
  }
  // This method sorts the price from low to High
  async sortingByLowToHigh() {
    this.productList.sort((a, b) => (a.price < b.price ? -1 : 1));
    this.sortby = 'lth';
  }
  // This method sorts the names from A - Z
  async sortingByAToZ() {
    this.productList.sort((a, b) => (a.productName < b.productName ? -1 : 1));
    this.sortby = 'atz';
  }
  // This method sorts the names from Z - A
  async sortingByZToA() {
    this.productList.sort((a, b) => (a.productName > b.productName ? -1 : 1));
    this.sortby = 'zta';
  }
  // This method loads the categories
  private loadCategories() {
    this.http.getCategoriesObservable().subscribe(data => {
      this.categorylist = data

    })
  }
  // This method shows the category's subcategories
  onCategorySelected(selectedCategoryId: any) {
    this.http.getSubCategoriesFromCategory(selectedCategoryId).subscribe(data => {
      this.subCategorylist = data
    })
  }
  // This method adds a product to the cart
  addToCart(item: any) {
    this.cartService.addToCart(item);
  }
  // This method search by product
    search(event:any)
    {
      this.searchTerm = (event.target as HTMLInputElement).value;
      this.searching.next(this.searchTerm);
      return this.searchTerm;
    }
  //This method shows the selected item on the list, if it is chosen on the dropdown autocomplete bar
  selectedItem(item:any)
  {
    this.searchTerm = item.productName;
    this.searching.next(this.searchTerm);
    return this.searchTerm;
  }

}


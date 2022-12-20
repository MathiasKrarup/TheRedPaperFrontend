import {Component, OnInit, ViewChild} from '@angular/core';
import {userService} from "../../../services/user.service";
import {ProductService} from "../../../services/product.service";
import jwtDecode from "jwt-decode";
import {Token} from "../../../Interfaces/token";
import {MatDialog} from "@angular/material/dialog";
import {EditProductComponent} from "../edit-product/edit-product.component";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-customers-products',
  templateUrl: './customers-products.component.html',
  styleUrls: ['./customers-products.component.scss']
})
export class CustomersProductsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  productList : any[] = []
  currentItemsToShow= [];


  productName: string = "";
  price: number = 0;
  description: string = "";
  imageUrl: string = "";

  constructor(private http : ProductService, private dialog: MatDialog) { }

  async ngOnInit() {

    let token = localStorage.getItem('token');
    if (!token)
      return console.log("There was no matching token found")
    let decodedToken = jwtDecode(token) as Token;

    this.productList = await this.http.getProductsFromUser(decodedToken.id);
    this.currentItemsToShow = this.productList.slice(0,3);
  }

  //This method opens editProduct component as a dialog
  openEditProduct(item: any) {
    let dialogRef = this.dialog.open(EditProductComponent, {
      data: {
        products: this.productList,
        item: item
      }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result != null) {
        this.currentItemsToShow[this.currentItemsToShow.findIndex(item => item.id == result.id)] = result;
      }
    });
  }

  //This method deletes a product
  async deleteProduct(id) {
    const product = await this.http.deleteProduct(id);
    this.productList = this.productList.filter(item => item.id != product.id)
    await this.ngOnInit();
  }

  //This method makes the pagnitator change page
  onPageChange($event) {
    this.currentItemsToShow = this.productList.slice($event.pageIndex*$event.pageSize,
      $event.pageIndex*$event.pageSize + $event.pageSize);
  }
}

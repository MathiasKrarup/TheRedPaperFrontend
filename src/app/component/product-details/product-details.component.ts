import {Component, Inject, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../Interfaces/product";
import {Users} from "../../../Interfaces/user";
import {Condition} from "../../../Interfaces/condition";




@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productDetailList : Product[];


  id: number = 0;
  productName: string = "";
  price: number = 0;
  productCondition: Condition = null;
  imageUrl: string = "";
  description: string = "";
  user: Users = null;

  constructor(private dialogRef: MatDialogRef<ProductDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data : any,
              private service: ProductService) {
    this.dialogRef.updateSize("1000px", "1000px")
    this.productDetailList = data.productDetailList;

    this.id = data.item.id;
    this.productName = data.item.productName;
    this.price = data.item.price;
    this.productCondition = data.item.productCondition;
    this.imageUrl = data.item.imageUrl;
    this.description = data.item.description;
    this.user = data.item.user;
  }

  ngOnInit(): void {
  }
  // This method closes the dialog
  close(){
    this.dialogRef.close();
  }

}

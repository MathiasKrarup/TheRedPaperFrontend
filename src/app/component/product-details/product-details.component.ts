import {Component, Inject, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../../services/product.service";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productDetailList : any[] = [];

  id: number = 0;
  productName: string = "";
  price: number = 0;
  condition: string = "";
  imageUrl: string = "";
  description: string = "";
  seller: object = null;

  constructor(private dialogRef: MatDialogRef<ProductDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data : any,
              private service: ProductService) {
    this.dialogRef.updateSize("1000px", "1000px")
    this.productDetailList = data.productDetailList;

    this.id = data.item.id;
    this.productName = data.item.productName;
    this.price = data.item.price;
    this.condition = data.item.condition;
    this.imageUrl = data.item.imageUrl;
    this.description = data.item.description;
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

}

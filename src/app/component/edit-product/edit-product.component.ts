import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  id: number = 0;
  productName: string = "";
  price: number = 0;
  description: string = "";
  imageUrl: string = "";

  productList: any [] = []

  constructor(private productService: ProductService, private dialogRef: MatDialogRef<EditProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.productList = data.productList
    this.id = data.item.id;
    this.productName = data.item.productName;
    this.price = data.item.price;
    this.description = data.item.description;
    this.imageUrl = data.item.imageUrl;

  }

  ngOnInit(): void {
  }



  async updateProduct() {
    const dto = await this.createDTO();
    const item = await this.productService.updateProduct(this.id, dto);
    this.dialogRef.close(item)
  }

  close() {
    this.dialogRef.close();
  }

  async createDTO() {
    let dto = {
      id: this.id,
      productName: this.productName,
      price: this.price,
      description: this.description,
      imageUrl: this.imageUrl
    }
    return dto;
  }
}

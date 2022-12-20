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
  productConditionId: number = 0;
  subCategoryID: number = 0;

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
    this.productConditionId = data.item.productConditionId;
    this.subCategoryID = data.item.subCategoryID;
  }

  ngOnInit(): void {
  }


  // This method updates the product
  async updateProduct() {
    const dto = await this.createDTO();
    const item = await this.productService.updateProduct(this.id, dto);
    this.dialogRef.close(item)
  }
  // This method closes the dialog
  close() {
    this.dialogRef.close();
  }
  // This method creates a dto
  async createDTO() {
    let dto = {
      id: this.id,
      productConditionId: this.productConditionId,
      productName: this.productName,
      price: this.price,
      description: this.description,
      imageUrl: this.imageUrl,
      subCategoryID: this.subCategoryID
    }
    return dto;
  }
}

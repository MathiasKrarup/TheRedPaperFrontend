import { Component, OnInit } from '@angular/core';
import {ConditionType} from "./Condition.types";
import {HttpService} from "../../../services/http.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  productName: any = ""
  price: any = 0
  description: any;
  imageUrl: any;
  width: any;
  length: any;

  categorylist : any[] = []
  subCategorylist : any[] = [{
    subcatetgoryId: 1,
    subCategoryName: "hey"
  }, {
    subcatetgoryId:  2,
    subCategoryName: "sdjkfhgdsf"
  }
  ]


  condition: any = ConditionType
  private infoForm: any;

  constructor(private http : HttpService) {
  }

 async ngOnInit() {
    this.categorylist = await this.http.getCategories();

  }

  get category(): FormControl {
    return this.infoForm.get('category');
  }

  close() {

  }

  createProduct() {

  }

  public get conditions(): typeof ConditionType {
    return ConditionType;
  }


  /*
    constructor(firstCond: ConditionType = ConditionType.Fremragende, secondCond: ConditionType = ConditionType.God,
                thirdCond: ConditionType = ConditionType.Brugt, fourthCond: ConditionType = ConditionType.Nedslidt) {
      this.condition = firstCond;
      this.condition = secondCond;
      this.condition = thirdCond
      this.condition = fourthCond;
    }
   */
  currentCategory: any;
  currentSubcategory: any;

  disabled() {
    this.currentSubcategory = "";
  }

  outputCategory() {
    console.log(this.currentCategory)
  }
}

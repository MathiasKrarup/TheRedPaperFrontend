import { Component, OnInit } from '@angular/core';
import {ConditionType} from "./Condition.types";
import {HttpService} from "../../../services/http.service";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import jwtDecode from "jwt-decode";
import {Token} from "../../../Interfaces/Token";


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  productName: any = ""
  price: any = 0
  description: any = ""
  imageUrl: any = ""

  currentCategory: any
  currentSubcategory: any

  categorylist: any[] = []
  subCategorylist: any[] = [{
    subcatetgoryId: 1,
    subCategoryName: "hey"
  }, {
    subcatetgoryId: 2,
    subCategoryName: "sdjkfhgdsf"
  }
  ]


  condition: any = ConditionType
  private infoForm: any;

  constructor(private http: HttpService, private router: Router) {
  }

  async ngOnInit() {
    this.categorylist = await this.http.getCategories();

  }

  get category(): FormControl {
    return this.infoForm.get('category');
  }

  close() {


  }


  async createProduct() {
    let token = localStorage.getItem('token');
    if (!token)
      return console.log("There was no matching token found")

    let decodedToken = jwtDecode(token) as Token;
    let dto = {
      Id: decodedToken.Id,
      productName: this.productName,
      imageUrl: this.imageUrl,
      price: this.price,
      description: this.description
    }
    const result = await this.http.createProduct(dto);
    console.log(result)
    await this.router.navigateByUrl('/mainview');
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



}

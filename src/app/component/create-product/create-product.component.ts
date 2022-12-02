import { Component, OnInit } from '@angular/core';
import {ConditionType} from "./Condition.types";
import {AuthService} from "../../../services/auth.service";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import jwtDecode from "jwt-decode";
import {Token} from "../../../Interfaces/token";
import {ProductService} from "../../../services/product.service";


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


  categorylist: any[] = []

  conditionlist: any [] = []


  subcategorylist: any[] = []

  currentsubCategory: any

  id: any

  condition: any
  private infoForm: any;

  constructor(private http: AuthService, private router: Router, private service: ProductService) {
  }
  async ngOnInit() {
    this.categorylist = await this.service.getCategories();
    this.subcategorylist = await this.service.getSubcategories();
    this.conditionlist = await this.service.getConditions();
  }


  get category(): FormControl {
    return this.infoForm.get('category');
  }

  close() {


  }


  async createProduct() {
    let token = localStorage.getItem('token');
    console.log(token)
    if (!token)
      return console.log("There was no matching token found")

    let decodedToken = jwtDecode(token) as Token;


      let dto = {
        userId: decodedToken.id,
        productName: this.productName,
        imageUrl: this.imageUrl,
        price: this.price,
        productCondition: this.condition,
        description: this.description,
        subCategoryId: this.currentsubCategory,
        productConditionId: this.condition,
      }
      console.log(this.condition);
      const result = await this.service.createProduct(dto);
      console.log(result)
      await this.router.navigateByUrl('/mainview');
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

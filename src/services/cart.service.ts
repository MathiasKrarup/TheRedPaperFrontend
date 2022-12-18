import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Product} from "../Interfaces/product";

@Injectable({
  providedIn: 'root'
})

export class CartService {


  public cartItemList : any = []
  public productList = new BehaviorSubject<any>([]);

  constructor() { }

  // Method used to get the list of products as Observable
  getProducts() {
   return this.productList.asObservable();
  }

  // Method used to add a product to the cart
  addToCart(product: any) {
    if (this.cartItemList.includes(product)){
      this.cartItemList.message = 'Product already exists!';
    }
    else {
      this.cartItemList.push(product)
    }
    this.productList.next(this.cartItemList)

    this.getTotalPrice();
  }

  // Method used to get the total price of all the products in the cart
  getTotalPrice() : number{
    let grandTotal = 0
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    })
    return grandTotal
  }
  // Method used to remove a product from the cart
  removeCartItem(product: any){
    this.cartItemList.map((a: any, index:any)=>{
      if (product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  // Method used to remove all the products from the cart
  removeAllCart() {
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}

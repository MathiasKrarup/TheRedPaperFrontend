import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {subscribeOn} from "rxjs";
import {Product} from "../../../Interfaces/product";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {Token} from "../../../Interfaces/token";

export const customAxios = axios.create({
  baseURL: 'https://localhost:7175',
  headers: {

  }
})
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products : Product[];
  grandTotal !: number;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res=>{
        this.products = res;
        this.grandTotal = this.cartService.getTotalPrice();
      })
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  emptyCart() {
    this.cartService.removeAllCart();
  }
  async createOrder() {
    let token = localStorage.getItem('token');
    console.log(token)
    if (!token)
      return console.log("There was no matching token found")

    let decodedToken = jwtDecode(token) as Token;
    let dto =  {
      userId: decodedToken.id,
      productsId: this.products.map(p => p.id)
    }
    const result = await this.cartService.createOrder(dto);
    this.emptyCart()
    return result
  }
}

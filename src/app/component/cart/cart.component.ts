import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {subscribeOn} from "rxjs";
import {Product} from "../../../Interfaces/product";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {Token} from "../../../Interfaces/token";
import {OrderService} from "../../../services/order.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products : Product[];
  grandTotal !: number;
  constructor(private cartService : CartService, private orderservice: OrderService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res=>{
        this.products = res;
        this.grandTotal = this.cartService.getTotalPrice();
      })
  }
  // This method removes an item
  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }
  // This method empties the cart
  emptyCart() {
    this.cartService.removeAllCart();
  }
  // This method creates an Order
  async createOrder() {
    let token = localStorage.getItem('token');
    if (!token)
      return console.log("There was no matching token found")

    let decodedToken = jwtDecode(token) as Token;
    let dto =  {
      userId: decodedToken.id,
      productsId: this.products.map(p => p.id)
    }
    const result = await this.orderservice.createOrder(dto);
    this.emptyCart()
    return result
  }
}

import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {subscribeOn} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  product : any = [];
  grandTotal !: number;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res=>{
        this.product = res;
        this.grandTotal = this.cartService.getTotalPrice();
      })
  }

}

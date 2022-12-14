import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import axios from "axios";
import {customAxios} from "./axios";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  // Method used to create an order
  async createOrder(dto: {userId: any; productsId: any}) {
    const httpResult = await customAxios.post('/Order', dto)
    return httpResult.data
  }

  // Method used to get all orders from a specific user
  getAllOrdersFromUser(userId: any): Observable<any> {
    const reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (localStorage.getItem('token'))
    })
    return this.httpClient.get('https://localhost:7175/Order/GetAllOrdersFromUser/' + userId, {headers: reqHeaders});
  }
}

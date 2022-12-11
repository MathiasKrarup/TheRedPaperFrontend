import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getAllOrdersFromUser(userId: any): Observable<any> {
    return this.httpClient.get('https://localhost:7175/Order/GetAllOrdersFromUser/' + userId);
  }
}

import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Orders} from "../../../Interfaces/order";
import {OrderService} from "../../../services/order.service";
import jwtDecode from "jwt-decode";
import {Token} from "../../../Interfaces/token";
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../Interfaces/product";
import {Users} from "../../../Interfaces/user";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements AfterViewInit{
  displayedColumns: string[] = ['imageUrl','productName', 'description', 'price'];
  dataSource: MatTableDataSource<Product>;
  selectedOrder!: string;
  productList!: Product[]
  orderList!: Orders[]
  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(private orderservice: OrderService, private productservice: ProductService) { }

  async ngAfterViewInit() {
    this.loadOrders()
  }

  onOrderSelected(selectedOrderId: any){
    this.productservice.getAllProductsByOrderId(selectedOrderId).subscribe(data => {
      this.productList = data
      this.dataSource = new MatTableDataSource<Product>(data)
      this.dataSource.paginator = this.paginator;
    })
  }

  private loadOrders() {
   let token = localStorage.getItem('token');
    if (!token)
     return console.log("There was no matching token found")

    let decodedToken = jwtDecode(token) as Token;

    this.orderservice.getAllOrdersFromUser(decodedToken.id).subscribe(data => {
    this.orderList = data
    })
  }
}

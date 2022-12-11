import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  displayedColumns: any;
  dataSource: MatTableDataSource<any>;

  constructor() { }

  ngOnInit(): void {
  }

}

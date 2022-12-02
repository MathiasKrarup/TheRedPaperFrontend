import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../../services/http.service";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import { DataSource } from '@angular/cdk/table';


@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.scss']
})
export class AdminviewComponent implements OnInit {
  displayedColumns: string[] = ['id', 'assignedRole', 'firstName', 'lastName', 'username', 'hash', 'salt', 'email', 'phoneNumber', 'location', 'products'];
  dataSource: MatTableDataSource<Users>;


  @ViewChild(MatPaginator) paginator : MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpService) {
  }

  async ngOnInit() {
    const users = await this.http.getUsers();
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

// Add to interfaces when product is pushed
export interface Users {
  id?: number,
  assignedRole?: number,
  firstName: string,
  lastName: string,
  username: string,
  hash?: string,
  salt?: string,
  birthDay?: string,
  email: string,
  phoneNumber: number,
  location: string,
  products?: string
}

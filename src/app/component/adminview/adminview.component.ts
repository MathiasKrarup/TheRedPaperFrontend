import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../../services/http.service";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";


@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.scss']
})
export class AdminviewComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'email', 'location',];
  dataSource: MatTableDataSource<Users>;


  @ViewChild(MatPaginator) paginator : MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpService) {
  }

  async ngAfterViewInit() {
    const users: Users[] = await this.http.getUsers();
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  location: string,
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../../services/http.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";


@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.scss']
})
export class AdminviewComponent implements OnInit {
  displayedColumns: string[] = ['id', 'assignedRole', 'firstName', 'lastName', 'username', 'birthDay', 'email', 'phoneNumber', 'location'];
  dataSource!: MatTableDataSource<Users>
  userList : any[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http : HttpService) { }

  async ngOnInit() {
    const users = this.userList = await this.http.getUsers();
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
  id: number,
  assignedRole: any,
  firstname: string,
  lastName: string,
  username: string,
  birthDay: any,
  email: string,
  phoneNumber: number,
  location: string
}

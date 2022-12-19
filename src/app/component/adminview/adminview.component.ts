import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {userService} from "../../../services/user.service";
import {Users} from "../../../Interfaces/user";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import jwtDecode from "jwt-decode";
import {Token} from "../../../Interfaces/token";
import axios from "axios";
import {EditPasswordComponent} from "../edit-password/edit-password.component";

export const customAxios = axios.create({
  baseURL: 'https://theredpaper.azurewebsites.net',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.scss']
})


export class AdminviewComponent implements AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'username', 'email', 'action'];
  dataSource: MatTableDataSource<Users>;

  userList: any [] = []


  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: userService, private dialog: MatDialog) {
  }


  async ngAfterViewInit() {
    localStorage.getItem('token');
    const users: Users[] = await this.service.getUsers();
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

  async deleteUser(row: any) {
    if (confirm('Are you sure, that you want to delete ' + row.firstName + ' ' + row.lastName)) {
      const user = await this.service.deleteUser(row.id);
      this.dataSource.data = this.dataSource.data.filter(u => u.id != user.id);
    }
  }

  editUser(row: any) {
    const data = this.dialog.open(DialogComponent, {
      data: {
        users: this.userList,
        row: row
      }
    });
    data.afterClosed().subscribe(async result => {
      if (result != null) {
        this.dataSource = new MatTableDataSource(await this.service.getUsers());
      }
    });
  }

  updatePassword(row) {
    const data = this.dialog.open(EditPasswordComponent, {
      data: {
        users: this.userList,
        row: row
      }
    });
    data.afterClosed().subscribe(async result => {
      if (result != null) {
        this.dataSource = new MatTableDataSource(await this.service.getUsers());
      }
    });
  }
}

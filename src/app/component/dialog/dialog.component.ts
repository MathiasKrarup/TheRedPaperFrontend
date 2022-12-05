import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {userService} from "../../../services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Users} from "../../../Interfaces/user";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  id: number = 0;
  firstName: string = "";
  lastName: string = "";
  username: string = "";
  email: string = "";
  password: string = "";
  location: string = "";
  phoneNumber: number = 0;
  birthDay: Date

  userList: any[] = []

  editUser: any;

  dataSource: MatTableDataSource<Users>;

  @ViewChild(MatPaginator) paginator: MatPaginator;






  constructor(private userService: userService, private dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data : any) {
    this.userList = data.userList;

    this.id = data.row.id;
    this.phoneNumber = data.row.phoneNumber;
    this.firstName = data.row.firstName;
    this.lastName = data.row.lastName;
    this.username = data.row.username;
    this.email = data.row.email;
    this.password = data.row.password;
    this.location = data.row.location;
    this.birthDay = data.row.birthDay;
  }

  ngOnInit(): void {

  }

   async saveUser() {
    const dto = await this.createDTO();
    const row = await this.userService.updateUser(this.id, dto);
    this.dialogRef.close(row)

    }

  close() {
    this.dialogRef.close();
  }

    async createDTO() {
    let dto = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
      password: this.password,
      location: this.location,
      phoneNumber: this.phoneNumber,
      birthDay: this.birthDay
    }
    return dto;
    }
}
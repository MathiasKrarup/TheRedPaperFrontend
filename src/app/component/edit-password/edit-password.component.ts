import {Component, Inject, OnInit} from '@angular/core';
import {userService} from "../../../services/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {
  id: number = 0;
  password: string = "";

  userList: any[] = []

  constructor(private service: AuthService, private dialogRef: MatDialogRef<EditPasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data : any) {
    this.userList = data.userList;

    this.id = data.row.id;
    this.password = data.row.password;
  }

  ngOnInit(): void {
  }

  //This method closes the dialog box
  close() {
    this.dialogRef.close();
  }

  //This method saves an updated password
  async savePassword() {
    if (!this.password){
      alert("You need to give this user a new password")
    }
    else {
      const dto = await this.createDTO();
      const row = await this.service.updatePassword(this.id, dto);
      this.dialogRef.close(row)
    }
  }

  //This method creates a DTO
  async createDTO() {
    let dto = {
      id: this.id,
      password: this.password
    }
    return dto;
  }
}

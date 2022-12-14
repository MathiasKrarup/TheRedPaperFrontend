import { Component, OnInit } from '@angular/core';
import {EmailService} from "../../../services/email.service";

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  from: any = ""
  subject: any = ""
  issue: any = ""
  body: any = ""

  constructor(private service: EmailService) { }

  ngOnInit(): void {
  }

  async createEmail(){
    let dto = {
      from: this.from,
      subject: this.subject,
      issue: this.issue,
      body: this.body
    }
    await this.service.createEmail(dto);
    alert("Email is succesfully sent!")
    this.from = ""
    this.subject = ""
    this.issue = ""
    this.body = ""
  }
}

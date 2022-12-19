import {Injectable} from "@angular/core";
import {customAxios} from "./axios";

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  constructor() { }


  async createEmail(dto: {from: any, issue: any, subject: any, body: any}){
    const httpResult = await customAxios.post('/Email', dto)
    return httpResult.data
  }
}

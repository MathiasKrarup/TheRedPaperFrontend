import {Injectable} from "@angular/core";
import axios from 'axios';


export const customAxios = axios.create({
  baseURL: 'https://localhost:7175',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
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

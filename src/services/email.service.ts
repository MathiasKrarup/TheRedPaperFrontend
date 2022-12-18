import {Injectable} from "@angular/core";
import axios from 'axios';

export const customAxios = axios.create({
  baseURL: 'https://theredpaper.azurewebsites.net',
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
    const httpResult = await customAxios.post('https://theredpaper.azurewebsites.net/Email', dto)
    return httpResult.data
  }
}

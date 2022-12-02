import { Injectable } from '@angular/core';
import axios from 'axios';

export const customAxios = axios.create({
  baseURL: 'https://localhost:7175',
  headers: {

  }
})


@Injectable({
  providedIn: 'root'
})
export class userService {
  users: any[] = [];

  constructor() {
  }

  async getUsers() {
    const httpResponse = await customAxios.get<any>('/User');
    this.users = httpResponse.data;
    return httpResponse.data;
  }

  async deleteUser(id: any) {
    const result = await  customAxios.delete('https://localhost:7175/User/'+id)
    return result.data;
  }


}

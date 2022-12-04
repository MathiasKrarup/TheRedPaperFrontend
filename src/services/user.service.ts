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
    const result = await customAxios.get<any>('/User');
    this.users = result.data;
    return result.data;
  }

  async updateUser(id: any, dto: {firstName: string; lastName: string; username: string; password: string;
  email: string; location: string}) {
    const result = await customAxios.put('/User/Edit/'+id, dto);
    return result.data;
  }

  async deleteUser(id: any) {
    const result = await  customAxios.delete('/User/'+id)
    return result.data;
  }


}

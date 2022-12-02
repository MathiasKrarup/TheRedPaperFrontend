import { Injectable } from '@angular/core';
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
export class HttpService {
users: any[] = [];

  constructor() { }

  async getUsers() {
    const httpResponse = await customAxios.get<any>('/User');
    this.users = httpResponse.data;
    return httpResponse.data;
  }

  async login(dto: any) {
    const httpResult = await customAxios.post('/Auth/login', dto);
    return httpResult.data;
  }

  async createUser(dto: { firstName: string; lastName: string; birthDay: Date; password: string; phoneNumber: number; location: string; email: string; username: string }) {
    const httpResult = await customAxios.post<any>('/Auth/RegisterUser', dto)
    return httpResult.data;
  }


}

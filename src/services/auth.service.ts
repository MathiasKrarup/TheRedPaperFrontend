import { Injectable } from '@angular/core';
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
export class AuthService {

  constructor() { }

  // Service method to login using either an admin or a customer
  async login(dto: any) {
    const httpResult = await customAxios.post('/Auth/login', dto);
    return httpResult.data;
  }

  // Service method to create a customer
  async createCustomer(dto: { firstName: string; lastName: string; birthDay: Date; password: string; phoneNumber: number; location: string; email: string; username: string }) {
    const httpResult = await customAxios.post<any>('/Auth/RegisterUser', dto)
    return httpResult.data;
  }

  // Service method to update an admin or user password
  async updatePassword(id: any, dto: {password: string;}) {
    const result = await customAxios.put('/Auth/UpdatePassword/'+id, dto);
    return result.data;
  }
}

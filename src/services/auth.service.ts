import { Injectable } from '@angular/core';
import axios from 'axios';
import * as http from "http";

export const customAxios = axios.create({
  baseURL: 'https://localhost:7175',
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
}

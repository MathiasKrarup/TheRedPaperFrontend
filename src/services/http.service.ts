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

  constructor() { }

  async getCategories() {
    const httpResponse = await customAxios.get<any>('/Category');
    return httpResponse.data;
  }

  async getSubcategories () {
    const httpResponse = await customAxios.get<any>('/SubCategory/GetAllSubs')
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

  async createProduct(dto: { subCategoryId:any; userId: any, price: any; imageUrl: any; description: any; productName: any; productCondition: any; }): Promise<any> {
    const httpResult = await customAxios.post<any>('/Product', dto)
    return httpResult.data;
  }
}

import { Injectable } from '@angular/core';
import axios from 'axios';
import {Observable} from "rxjs";
import {Category} from "../Interfaces/category";
import {HttpClient, HttpParams} from "@angular/common/http";

export const customAxios = axios.create({
  baseURL: 'https://localhost:7175',
  headers: {

  }
})


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private httpClient: HttpClient) {}

  async getConditions(){
    const httpResponse = await customAxios.get<any>('/Condition')
    return httpResponse.data;
  }

   getCategoriesObservable(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('https://localhost:7175/Category');
  }

  async getCategories() {
    const httpResponse = await customAxios.get<any>('/Category');
    return httpResponse.data;
  }

  getSubCategoriesFromCategory(selectedCategoryId: string): Observable<any>{
    return this.httpClient.get(  'https://localhost:7175/SubCategory/GetAllSubsFromCategories/'+selectedCategoryId)
  }
  async getSubcategories () {
    const httpResponse = await customAxios.get<any>('/SubCategory/GetAllSubs')
    return httpResponse.data;
  }

  async createProduct(dto: { subCategoryId:any; userId: any, price: any; imageUrl: any; description: any; productName: any; productCondition: any; }): Promise<any> {
    const httpResult = await customAxios.post<any>('/Product', dto)
    return httpResult.data;
  }
  async getProductById(id: number){
    const httpResult = await customAxios.get<any>('productinfo/'+id);
    return httpResult.data;
  }

  async getAllProducts() {
    const httpResult = await customAxios.get<any>('/Product/GetAllProducts');
    return httpResult.data;
  }

  async sortingByHighToLow(){
    const httpResult = await customAxios.get<any>('/GetAllProductsFromPriceHighToLow');
    return httpResult.data;
  }

  async sortingByLowToHigh(){
    const httpResult = await customAxios.get<any>('/GetAllProductsFromPriceLowToHigh');
    return httpResult.data;
  }

  async sortingByAToZ(){
    const httpResult = await customAxios.get<any>('/GetAllProductsAlphabetSortingA-Z');
    return httpResult.data;
  }

  async sortingByZToA(){
    const httpResult = await customAxios.get<any>('/GetAllProductsAlphabetSortingZ-A');
    return httpResult.data;
  }
}

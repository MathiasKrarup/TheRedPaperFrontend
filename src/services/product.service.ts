import { Injectable } from '@angular/core';
import axios from 'axios';
import {Observable} from "rxjs";
import {Category} from "../Interfaces/category";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {customAxios} from "./axios";


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private httpClient: HttpClient) {}

  // Method used to get the conditions
  async getConditions(){
    const httpResponse = await customAxios.get<any>('/Condition')
    return httpResponse.data;
  }

  // Method used to get the Categories as Observable
   getCategoriesObservable(): Observable<Category[]> {
     const reqHeaders = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + (localStorage.getItem('token'))
     })
    return this.httpClient.get<Category[]>('https://theredpaper.azurewebsites.net/Category', {headers: reqHeaders});
  }

  // Method used to get the categories
  async getCategories() {
    const httpResponse = await customAxios.get<any>('/Category');
    return httpResponse.data;
  }

  // Method used to get the subcategories from specific category
  getSubCategoriesFromCategory(selectedCategoryId: string): Observable<any>{
    const reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (localStorage.getItem('token'))
    })
    return this.httpClient.get(  'https://theredpaper.azurewebsites.net/SubCategory/GetAllSubsFromCategories/'+selectedCategoryId, {headers: reqHeaders})
  }

  // Method used to get the subcategories
  async getSubcategories () {
    const httpResponse = await customAxios.get<any>('/SubCategory/GetAllSubs')
    return httpResponse.data;
  }

  // Method used to create a product
  async createProduct(dto: { subCategoryId:any; userId: any, price: any; imageUrl: any; description: any; productName: any; productCondition: any; }): Promise<any> {
    const httpResult = await customAxios.post<any>('/Product', dto)
    return httpResult.data;
  }

  // Method used to get a product by id
  async getProductById(id: number){
    const httpResult = await customAxios.get<any>('productinfo/'+id);
    return httpResult.data;
  }

  // Method used to get all products
  async getAllProducts() {
    const httpResult = await customAxios.get<any>('/Product/GetAllProducts');
    return httpResult.data;
  }

  // Method used to get all products from specific subcategory id
  getAllProductsFromSubId(selectedSubId: string): Observable<any>{
    const reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (localStorage.getItem('token'))
    })
    return this.httpClient.get('https://theredpaper.azurewebsites.net/Product/GetAllProductsFromSub/' + selectedSubId, {headers: reqHeaders});
  }

  // Method to get a specific user's products
  async getProductsFromUser(userId: any) {
    const httpResult = await customAxios.get<any>('/Product/getProductsFromUser' + userId);
    return httpResult.data;
  }

  // Method used to update a product
  async updateProduct(id: number, dto: {productName: string; description: string; price: number; subCategoryID: number
  imageUrl: string; productConditionId: number}) {
    const httpResult = await customAxios.put('/Product/Edit/'+id, dto);
    return httpResult.data;
  }

  // Method used to delete a product
 async deleteProduct(id: any) {
    const httpResult = await customAxios.delete('https://theredpaper.azurewebsites.net/Product/'+id);
    return httpResult.data;
 }

  // Method used to sort the price from High to Low
  async sortingByHighToLow(){
    const httpResult = await customAxios.get<any>('/GetAllProductsFromPriceHighToLow');
    return httpResult.data;
  }

  // Method used to sort the price from low to high
  async sortingByLowToHigh(){
    const httpResult = await customAxios.get<any>('/GetAllProductsFromPriceLowToHigh');
    return httpResult.data;
  }

  // Method used to sort the products alphabetical from A-Z
  async sortingByAToZ(){
    const httpResult = await customAxios.get<any>('/GetAllProductsAlphabetSortingA-Z');
    return httpResult.data;
  }

  // Method used to sort the products alphabetical from Z-A
  async sortingByZToA(){
    const httpResult = await customAxios.get<any>('/GetAllProductsAlphabetSortingZ-A');
    return httpResult.data;
  }

  // Method used to get the products from a specific orderId
   getAllProductsByOrderId(orderId: number): Observable<any>{
     const reqHeaders = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + (localStorage.getItem('token'))
     })
    return this.httpClient.get('https://theredpaper.azurewebsites.net/Product/GetAllProductsByOrderId/' + orderId, {headers: reqHeaders});
  }
}

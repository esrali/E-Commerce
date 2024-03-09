import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  BaseUrl:string='https://ecommerce.routemisr.com';
  constructor(private _HttpClient:HttpClient) { }

  getProductsApi(pageNum:number=1):Observable<any>{
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/products?page=${pageNum}`)
  }

  getProductDetailsApi(id:string):Observable<any>{
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/products/${id}`)
  }

  getCategoryApi():Observable<any>{
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/categories`)
  }
  getSpacificCategory(catId:string|null):Observable<any>{
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/categories/${catId}`)
  }

  getAllBrands():Observable<any>{
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/brands`)
  }

  getSpacificBrandApi(bId:string):Observable<any>{
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/brands/${bId}`)
  }
}

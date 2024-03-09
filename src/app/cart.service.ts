import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  numOfCats:BehaviorSubject<any>=new BehaviorSubject(null);
  BaseUrl:string='https://ecommerce.routemisr.com';
  //headers:any={token:localStorage.getItem("userToken")};
  constructor(private _HttpClient:HttpClient) { }

  addToCartApi(prodId:string):Observable<any>{
    return this._HttpClient.post(`${this.BaseUrl}/api/v1/cart`,{"productId": prodId})
  }
  //ely ba3redhom fe safha el cart
  getUserCart():Observable<any>{
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/cart`)
  }
//يتمسح كارت معين
  removeSpacificCartApi(pId:string):Observable<any>{
    return this._HttpClient.delete(`${this.BaseUrl}/api/v1/cart/${pId}`)
  }

  //عايزا اعمل ابديت في العدد بتاع الكارت بالذائد والماينص
  updateCartApi(pId:string,count:number):Observable<any>{
    return this._HttpClient.put(`${this.BaseUrl}/api/v1/cart/${pId}`,{"count": count})
  }

  //clear el cart kolha
  clearCartApi():Observable<any>{
    return this._HttpClient.delete(`${this.BaseUrl}/api/v1/cart`)
  }

  //online payment
  checkout(cId:string,userData:object):Observable<any>
  {
    return this._HttpClient.post(`${this.BaseUrl}/api/v1/orders/checkout-session/${cId}?url=http://localhost:4200`,
    {
      shippingAddress:userData
    }
      )
  }}



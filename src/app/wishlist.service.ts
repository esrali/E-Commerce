import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  numOfWishlist:BehaviorSubject<any>=new BehaviorSubject(null);

  BaseUrl:string='https://ecommerce.routemisr.com';
  constructor(private _HttpClient:HttpClient) { }

  addToWishListApi(pId:string):Observable<any>{
    return this._HttpClient.post(`${this.BaseUrl}/api/v1/wishlist`,
    {
      productId: pId
  })
  }

  getAllWishListApi():Observable<any>{
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/wishlist`)
  }

  removeFromWishlistApi(pId:string):Observable<any>{
    return this._HttpClient.delete(`${this.BaseUrl}/api/v1/wishlist/${pId}`)
  }
}

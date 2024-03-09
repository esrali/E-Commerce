import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  BaseUrl:string='https://ecommerce.routemisr.com';
  constructor(private _HttpClient:HttpClient,private _AuthService:AuthService) { }

//cash payment
cashayment(id:string,userData:object):Observable<any>{
  return this._HttpClient.post(`${this.BaseUrl}/api/v1/orders/${id}`,{
    shippingAddress:userData
  })
}

//get all order
getUserOrder():Observable<any>
{
  return this._HttpClient.get(`${this.BaseUrl}/api/v1/orders/user/${this._AuthService.userId}`)
}
}

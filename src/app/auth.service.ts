import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

interface redisterInterface
{
  name?:string;
  email?:string;
  password?:string;
  rePassword?:string;
  phone?:string;
  resetCode?:string;
  newPassword?:string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:BehaviorSubject<any>=new BehaviorSubject(null);
  BaseUrl:string='https://ecommerce.routemisr.com';
  userId:string=""

  constructor(private _HttpClient:HttpClient,private _Router:Router) {
    if(localStorage.getItem("currentPage"))
    {
      this._Router.navigate([localStorage.getItem("currentPage")])
    }
  }

  registerApi(rData:redisterInterface):Observable<any>
  {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, rData)
  }
  loginApi(rData:redisterInterface):Observable<any>{
    return this._HttpClient.post(`${this.BaseUrl}/api/v1/auth/signin`,rData)

  }
  forgetPassApi(rData:redisterInterface):Observable<any>{
    return this._HttpClient.post(`${this.BaseUrl}/api/v1/auth/forgotPasswords`,rData)
  }
  verifyApi(rData:redisterInterface):Observable<any>{
    return this._HttpClient.post(`${this.BaseUrl}/api/v1/auth/verifyResetCode`,rData)
  }
  newPassApi(rData:redisterInterface):Observable<any>{
    return this._HttpClient.put(`${this.BaseUrl}/api/v1/auth/resetPassword`,rData)
  }
  saveDataMethod(){
    if(localStorage.getItem("userToken")!=null)
    {
      this.userData.next(localStorage.getItem("userToken"));
      this.userData.next(jwtDecode(this.userData.getValue()));
      this.userId=this.userData.getValue().id;
    }
    else{
      this.userData.next(null);
    }
  }
}

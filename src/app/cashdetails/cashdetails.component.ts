import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
import { PaymentService } from '../payment.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-cashdetails',
  templateUrl: './cashdetails.component.html',
  styleUrls: ['./cashdetails.component.scss']
})
export class CashdetailsComponent implements OnInit{

  cartId:any=''

  constructor(private _FormBuilder:FormBuilder,
    private _ActivatedRoute:ActivatedRoute,
    private _CartService:CartService,
    private _PaymentService:PaymentService,
    private _Router:Router,
    private toastEvokeService: ToastEvokeService,){}


  checkOut:FormGroup=this._FormBuilder.group({
    details:[null,[Validators.required]],
    phone:[null,[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)]],
    city:[null,[Validators.required]]
  })

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartId=params.get('id')
      }
    })
  }

  checkout():void{
    this._PaymentService.cashayment(this.cartId,this.checkOut.value).subscribe({
      next:(res)=>{
        // Type SUCCESS
        this.toastEvokeService.success(`success`,`The order will be delivered to you soon`).subscribe();
        console.log(res);
        if(res.status=="success"){
          this._CartService.numOfCats.next(0);
          this._Router.navigate(['/allOrder'])
        }
      }
    })
  }
}

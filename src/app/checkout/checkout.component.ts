import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{
  constructor(private _FormBuilder:FormBuilder,private _ActivatedRoute:ActivatedRoute,private _CartService:CartService){}

  checkOut:FormGroup=this._FormBuilder.group({
    details:[null,[Validators.required]],
    phone:[null,[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)]],
    city:[null,[Validators.required]]
  })
  cartId:any=''
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartId=params.get('id')
      }
    })
  }

  checkout():void{
    console.log(this.checkOut.value)
    this._CartService.checkout(this.cartId,this.checkOut.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status=='success')
        {
          window.open(res.session.url,'_self')
        }
      }
    })
  }
}

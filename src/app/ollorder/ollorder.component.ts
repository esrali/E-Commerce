import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ollorder',
  templateUrl: './ollorder.component.html',
  styleUrls: ['./ollorder.component.scss']
})
export class OllorderComponent implements OnInit{

  cartId:any=''
  allOrders:any='';

constructor(private _PaymentService:PaymentService,private _ActivatedRoute:ActivatedRoute){}
ngOnInit():void{

  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
      this.cartId=params.get('id')
    }
  })


  this._PaymentService.getUserOrder().subscribe({
    next:(res)=>{
      console.log(res);
      this.allOrders=res;

    }
  })
}
}

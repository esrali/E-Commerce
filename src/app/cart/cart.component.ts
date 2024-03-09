import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartDetails:any=null;
  constructor(private _CartService:CartService ,private toastEvokeService: ToastEvokeService){}
  //start
  ngOnInit():void{
    localStorage.setItem("currentPage","/cart")
    this._CartService.getUserCart().subscribe({
      next:(res)=>{
        this.cartDetails=res.data;
        console.log(res);
      }
    })

  }
  //delete
  removeSpacificCart(pId:string):void{
    this._CartService.removeSpacificCartApi(pId).subscribe({
      next:(res)=>{
        this._CartService.numOfCats.next(res.numOfCartItems);
        this.cartDetails=res.data;
        this.toastEvokeService.danger('Success', 'item Deleted Successfully').subscribe();
        if(res.numOfCartItems==0){
          {
            this.cartDetails=null;
          }
        }
      }
    })
  }
  //update +,-
  changeCount(pId:string,count:number){
    this._CartService.updateCartApi(pId,count).subscribe({
      next:(res)=>{
        this.cartDetails=res.data;
        if(count==0)
          {
            this.removeSpacificCart(pId)
            this.cartDetails=res.data;
          }
      }
    })

  }
  //clear eh cart kolha
  clearAll():void{
    this._CartService.clearCartApi().subscribe({
      next:(res)=>{
        if(res.message ==="success")
        {
          this.cartDetails = null;
          this._CartService.numOfCats.next(0);
        }
      }

    })
  }



}

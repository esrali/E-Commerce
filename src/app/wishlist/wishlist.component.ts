import { Component, OnInit, Renderer2 } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { Product } from '../product';
import { CartService } from '../cart.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit{
  wishListDetails:any=null;


constructor(private _WishlistService:WishlistService,private _CartService:CartService,private toastEvokeService: ToastEvokeService,
  private _Renderer2:Renderer2){}

ngOnInit(): void {
  this._WishlistService.getAllWishListApi().subscribe({
    next:(res)=>{
      this.wishListDetails=res.data;
      if(res.count==0)
          {
            this.wishListDetails=null;
          }
    }
  })
}

removeSpacificCart(id:string):void{
  this._WishlistService.removeFromWishlistApi(id).subscribe({
    next:(res)=>{
      this._WishlistService.getAllWishListApi().subscribe({
        next:(res)=>{
          this.wishListDetails=res.data;
          this._WishlistService.numOfWishlist.next(res.count)
          if(res.count==0)
          {
            this.wishListDetails=null;
          }
        }
      })
      // Type SUCCESS
      this.toastEvokeService.success(res.status,res.message).subscribe();
    }
  })
}

AddCart(pId:string){
  this._CartService.addToCartApi(pId).subscribe({
    next:(res)=>{
       // Type SUCCESS
      this.toastEvokeService.success(`success`,res.message).subscribe();
      this._CartService.numOfCats.next( res.numOfCartItems);
        //remove
      this.removeSpacificCart(pId);

    },
    error:(err)=>{

    }
  })
}


}

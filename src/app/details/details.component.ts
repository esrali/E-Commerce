import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { WishlistService } from '../wishlist.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
//productDetails:any;
productDetails:Product={} as Product;
wishListIds:string[]=[]; //["id","id","id",...]


customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
}
constructor(private toastEvokeService: ToastEvokeService,
  private _ActivatedRoute:ActivatedRoute,
  private _ProductsService:ProductsService,
  private _CartService:CartService,
  private _WishlistService:WishlistService){}
ngOnInit():void{
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
      let idProduct:any=params.get('id');
      this._ProductsService.getProductDetailsApi(idProduct).subscribe({
        next:(res)=>{
          this.productDetails=res.data;
        }
      })
    }
  })

  this._WishlistService.getAllWishListApi().subscribe({
    next:(res)=>{
      const newData=res.data.map((item:any)=>item._id);
      this.wishListIds=newData;
    }
  })
}

addCart(pId:string):void{
this._CartService.addToCartApi(pId).subscribe({
  next:(res)=>{
    // Type SUCCESS
    this.toastEvokeService.success(`success`,res.message).subscribe();
    this._CartService.numOfCats.next( res.numOfCartItems);
  }

})
}

addToWishList(id:string):void{
  this._WishlistService.addToWishListApi(id).subscribe({
    next:(res)=>{
      this.wishListIds=res.data
       // Type SUCCESS
      this.toastEvokeService.success(`success`,res.message).subscribe();
      for(let i=0;i<res.data.length;i++){
        this._WishlistService.numOfWishlist.next(i+1);
      }
    }
  })
}
removeSpacificWish(id:string):void{
  this._WishlistService.removeFromWishlistApi(id).subscribe({
    next:(res)=>{
      this.wishListIds=res.data;
      // Type SUCCESS
      this.toastEvokeService.success(res.status,res.message).subscribe();
      for(let i=0;i<res.data.length;i++){
        if(res.data.length==0)
        {this._WishlistService.numOfWishlist.next(0);}
        else
        {this._WishlistService.numOfWishlist.next(i+1);}
      }
    }
  })
}
}

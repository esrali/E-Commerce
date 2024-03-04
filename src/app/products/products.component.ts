import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { CartService } from '../cart.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  allProducts:Product[]=[];
  pageSize:number=0; //limit
  currentPage:number=1
  total:number=0;  //result
  wishListIds:string[]=[]; //["id","id","id",...]

  constructor(private _ProductsService:ProductsService,private _CartService:CartService,private toastEvokeService: ToastEvokeService,private _WishlistService:WishlistService){}
  ngOnInit():void{
    localStorage.setItem("currentPage","/products");
    this._ProductsService.getProductsApi().subscribe({
      next:(res)=>{
        this.allProducts=res.data;
        this.pageSize=res.metadata.limit;
        this.currentPage=res.metadata.currentPage;
        this.total=res.results;
      },
      error:(err)=>{
        console.log(err);
      }
    })

    this._WishlistService.getAllWishListApi().subscribe({
      next:(res)=>{
        const newData=res.data.map((item:any)=>item._id);
        this.wishListIds=newData;
      }
    })
  }

  AddCart(pId:string){
    this._CartService.addToCartApi(pId).subscribe({
      next:(res)=>{
         // Type SUCCESS
        this.toastEvokeService.success(`success`,res.message).subscribe();
        this._CartService.numOfCats.next( res.numOfCartItems);
      }
    })
  }


  pageChanged(event:any):void{
    this._ProductsService.getProductsApi(event).subscribe({
      next:(res)=>{
        this.allProducts=res.data;
        this.pageSize=res.metadata.limit;
        this.currentPage=res.metadata.currentPage;
        this.total=res.results;
      },
      error:(err)=>{
        console.log(err);
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

import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { WishlistService } from '../wishlist.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allProducts:Product[]=[];
  categories:any[]=[];
  inputValue:string='';
  wishListIds:string[]=[]; //["id","id","id",...]

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
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
        items: 6
      }
    },
    nav: false
  }
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    items:1,
    nav: false
  }

  constructor(private toastEvokeService: ToastEvokeService,
    private _ProductsService:ProductsService,
    private _CartService:CartService,
    private _Renderer2:Renderer2,
    private _WishlistService:WishlistService){}
  ngOnInit():void{
    //5zent el page el kont feha
    localStorage.setItem("currentPage","/home")

    //call el function ely btrag3 el products
    this._ProductsService.getProductsApi().subscribe({
      next:(res)=>{
        this.allProducts=res.data;
      },
      // error:(err)=>{
      //   console.log(err);
      // }
    })

    //get el categories
    this._ProductsService.getCategoryApi().subscribe({
      next:(res)=>{
        this.categories=res.data;
      }
    })
    // this.toastEvokeService.info('I am title!', 'I am a message!').subscribe();
    // this.toastEvokeService.warning('I am title!', 'I am a message!').subscribe();
    this._WishlistService.getAllWishListApi().subscribe({
      next:(res)=>{
        const newData=res.data.map((item:any)=>item._id);
        this.wishListIds=newData;
      }
    })
  }

  AddCart(pId:string,element:HTMLButtonElement){
    this._Renderer2.setAttribute(element,'disabled','true')
    this._CartService.addToCartApi(pId).subscribe({
      next:(res)=>{
         // Type SUCCESS
        this.toastEvokeService.success(`success`,res.message).subscribe();
        this._CartService.numOfCats.next( res.numOfCartItems);
        this._Renderer2.removeAttribute(element,'disabled');
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(element,'disabled');
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
        // this._WishlistService.getAllWishListApi().subscribe({
        //   next:(res)=>{
        //     this.wishListDetails=res.data;
        //     if(res.count==0)
        //     {
        //       this.wishListDetails=null;
        //     }
        //   }
        // })
      }
    })
  }

}

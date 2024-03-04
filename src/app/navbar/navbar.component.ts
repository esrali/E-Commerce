import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  isLogin!:boolean;
  cartsNumber:string='';
  wishNumber:string='';
  constructor(private _CartService:CartService,private _AuthService:AuthService,private _Router:Router,private _Renderer2:Renderer2,private _WishlistService:WishlistService){};

@ViewChild('navBar') navElement!:ElementRef;
@HostListener('window:scroll')
onScroll():void{
  if(scrollY>300)
  {
    this._Renderer2.addClass(this.navElement.nativeElement,'py-3')
  }else{
    this._Renderer2.removeClass(this.navElement.nativeElement,'py-3')
  }
}
  ngOnInit():void
  {
    this._CartService.numOfCats.subscribe({
      next:()=>{
        this.cartsNumber=this._CartService.numOfCats.getValue();
      }
    })
    this._WishlistService.numOfWishlist.subscribe({
      next:(res)=>{
        this.wishNumber=this._WishlistService.numOfWishlist.getValue();
      }
    })
    this._AuthService.userData.subscribe(()=>{

      if(this._AuthService.userData.getValue()==null)
      {
        this.isLogin=false;
      }
      else{
        this.isLogin=true;
      }
    })
  }
  logout(){
    localStorage.removeItem("userToken");
    //اما اخلي اليوزر داتا ب نل او انادى ال ساف داتا ميسود وهي بتعمل كدا
    // this._AuthService.userData.next(null);
    this._AuthService.saveDataMethod();
    this._Router.navigate(['/login']);
  }



}

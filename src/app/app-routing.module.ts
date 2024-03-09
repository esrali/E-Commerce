import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuard } from './auth.guard';
import { DetailsComponent } from './details/details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CashdetailsComponent } from './cashdetails/cashdetails.component';
import { OllorderComponent } from './ollorder/ollorder.component';
import { CatDetailsComponent } from './cat-details/cat-details.component';

const routes: Routes = [
  {path:"", redirectTo:"home",pathMatch:"full",title:"home"},
  {path:"register",component:RegisterComponent,title:"register"},
  {path:"login",component:LoginComponent,title:"login"},
  {path:"home",canActivate:[authGuard],component:HomeComponent,title:"home"},
  {path:"details/:id",canActivate:[authGuard],component:DetailsComponent,title:"details"},
  {path:"brands",canActivate:[authGuard], component:BrandsComponent,title:"brands"},
  {path:"cart",canActivate:[authGuard],component:CartComponent,title:"cart"},
  {path:"catDetails/:id",canActivate:[authGuard],component:CatDetailsComponent,title:"catDetails"},
  {path:"wishlist",canActivate:[authGuard],component:WishlistComponent,title:"wishlist"},
  {path:"allOrder",canActivate:[authGuard],component:OllorderComponent,title:"allOrder"},
  {path:"checkout/:id",canActivate:[authGuard],component:CheckoutComponent,title:"checkout"},
  {path:"cashDetails/:id",canActivate:[authGuard],component:CashdetailsComponent,title:"cashDetails"},
  {path:"products",canActivate:[authGuard],component:ProductsComponent,title:"products"},
  {path:"categories",canActivate:[authGuard],component:CategoriesComponent,title:"categories"},
  {path:"**",component:NotfoundComponent,title:"not fount page"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

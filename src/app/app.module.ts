import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { DetailsComponent } from './details/details.component'
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchPipe } from './search.pipe';

// Import from library
import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule,
} from '@costlydeveloper/ngx-awesome-popup';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderInterceptor } from './header.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './loading.interceptor';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CashdetailsComponent } from './cashdetails/cashdetails.component';
import { OllorderComponent } from './ollorder/ollorder.component';
import { CatDetailsComponent } from './cat-details/cat-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrandsComponent,
    ProductsComponent,
    CategoriesComponent,
    CartComponent,
    RegisterComponent,
    LoginComponent,
    NotfoundComponent,
    NavbarComponent,
    FooterComponent,
    DetailsComponent,
    SearchPipe,
    CheckoutComponent,
    WishlistComponent,
    CashdetailsComponent,
    OllorderComponent,
    CatDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule ,
    BrowserAnimationsModule ,
    CarouselModule,
    FormsModule,
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
    ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
    ToastNotificationConfigModule.forRoot(), // Needed for instantiating toast notifications.
    NgxPaginationModule,NgxSpinnerModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:HeaderInterceptor,multi:true},
              {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

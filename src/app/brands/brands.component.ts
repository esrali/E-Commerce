import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brandsData:any[]=[];
  oneBrand:any={}

  constructor(private _ProductsService:ProductsService){}
  ngOnInit():void{
    localStorage.setItem("currentPage","/brands")
    this._ProductsService.getAllBrands().subscribe({
      next:(res)=>{
        this.brandsData=res.data;
      }
    })
  }

  getDetails(pid:string):void
{
  this._ProductsService.getSpacificBrandApi(pid).subscribe({
    next:(res)=>{
      this.oneBrand=res.data;
    }
  })

}
}

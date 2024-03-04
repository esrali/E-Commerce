import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
allCat:any[]= []

  constructor(private _ProductsService:ProductsService){}
  ngOnInit():void{
    localStorage.setItem("currentPage","/categories")
    this._ProductsService.getCategoryApi().subscribe({
      next:(res)=>{
        console.log(res);
        this.allCat=res.data;
      }
    })

  }

  getDetails(id:string):void{
    this._ProductsService.getSpacificCategory(id).subscribe({
      next:(res)=>{
        console.log(res)
      }
    })
  }

}

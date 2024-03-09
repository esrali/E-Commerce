import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-cat-details',
  templateUrl: './cat-details.component.html',
  styleUrls: ['./cat-details.component.scss']
})
export class CatDetailsComponent {
  catDetailsId:string|null = "" ;
  categoryDetails:any = {}
  constructor( private _ProductsService:ProductsService , private _ActivatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p) =>
      {
          this.catDetailsId = p.get('id')
          console.log(this.catDetailsId);
      }
    })

    this._ProductsService.getSpacificCategory(this.catDetailsId).subscribe({
      next:(res) =>
      {
        console.log(res);
        this.categoryDetails = res.data ;
      }
    })

  }

}

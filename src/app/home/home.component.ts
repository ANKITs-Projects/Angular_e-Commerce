import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { product } from '../data type/user-signUp';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  popularProducts: undefined | product[]; 
  trentingProducts: undefined | product[]; 
  
  constructor(private prodService : ProductService){  }
  ngOnInit(){
    this.prodService.popularProducts().subscribe((res)=>{
      this.popularProducts=res;
    });
    this.prodService.trendingProduct().subscribe((res)=>{
      this.trentingProducts=res;
    });
  }
}

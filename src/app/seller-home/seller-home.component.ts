import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { product } from '../data type/user-signUp';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  
  produvtList: undefined | product[];
  productDeleteMessage: undefined | string;
  constructor(private product:ProductService){}
  ngOnInit():void{
   this.list();
  }
  list(){
    this.product.productList().subscribe((result)=>{
      this.produvtList=result;
    })
  }
  deleteProduct(id:number):void{
      this.product.deleteProduct(id).subscribe((res)=>{
        if(res){
          this.productDeleteMessage="Product IS Deleted";
          this.list();
        }
      })
      setTimeout(()=>{this.productDeleteMessage=undefined},3000)
  }

}




import { Component, Inject } from '@angular/core';
import { ProductService } from '../service/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  addProductMessage:string | undefined;
  constructor(private product:ProductService){}
  addProduct(data:NgForm){
    this.product.addProduct(data.value).subscribe((result)=>{
      console.log(result);
      if(result){
        this.addProductMessage="Product Is Successfully Added";
      }
      setTimeout(()=>(this.addProductMessage=undefined),3000)
    });
  }
}

import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from '../data type/user-signUp';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  productData: undefined | product;
  updateProductMessage: undefined | string;
  constructor(private route: ActivatedRoute, private productService:ProductService){}
  ngOnInit():void{
    let prodId=this.route.snapshot.paramMap.get('id');
    prodId && this.productService.getProductId(prodId).subscribe((data)=>{
      this.productData=data;
    })
  }
  updateProduct(data: product){
    if(this.productData){
      data.id =this.productData.id;
    }
    this.productService.updateProduct(data).subscribe((res)=>{
      if(res){
        this.updateProductMessage="Product Update Successfully";
      }
    })
    setTimeout(()=>{
      this.updateProductMessage=undefined;
    },3000)
  }
}

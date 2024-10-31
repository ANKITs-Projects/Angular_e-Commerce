import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { cart, product,userSignUp } from '../data type/user-signUp';
import { fail } from 'node:assert';
import { log } from 'node:console';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  protectedQuantity:number=1;
  productDetail: product;
  removeFromCart :boolean=false;
  cartData:product| undefined;
  
  constructor(private activateRoute: ActivatedRoute, private productservice: ProductService){}

  ngOnInit(){
    let productId= this.activateRoute.snapshot.paramMap.get('id');
    productId && this.productservice.getProduct(productId).subscribe((res)=>{
      this.productDetail =res;
    });
    try{
      let cartData= localStorage.getItem('localCart')
      if(productId && cartData){
        let item =JSON.parse(cartData);
        item = item.filter((item:product)=>productId== item.id.toString())
        if(item.length){
          this.removeFromCart=true;
        }else{
          this.removeFromCart=false;
        }
      }
      let user=localStorage.getItem('user');
      if(user){
        let userId= user && JSON.parse(user)[0].id;
        this.productservice.getCartList(userId);
        this.productservice.cartDataItems.subscribe((resp)=>{
         let item= resp.filter((item:product)=>productId?.toString()===item.productId?.toString())
         if( item.length){
          this.cartData=item[0];
          this.removeFromCart=true;
         }
        })
      }
    }catch{
      console.log('local storage error');
    }
  }



  quantityManager(value:string){
    if(this.protectedQuantity<20 && value==='add'){
      this.protectedQuantity++;
    } 
    if(this.protectedQuantity>1 && value==='sub'){
      this.protectedQuantity--;
    }
  }
  addToCart(){

    if(this.productDetail){
      this.productDetail.quantity=this.protectedQuantity;
    }
    if(window!= undefined && localStorage!==undefined){
      if(!localStorage.getItem('user')){
        this.productservice.addToCart(this.productDetail);
        this.removeFromCart=true;
      }else{
        console.log('user is logedin')
        let userData= localStorage.getItem('user');
        let userData2=userData && JSON.parse(userData)[0];
        let userId=userData2.id;
        let cartData:cart={
          ...this.productDetail,
          userId,
          productId:this.productDetail.id
        }
        delete cartData.id;
        
        this.productservice.addToCartLogin(cartData).subscribe((resp)=>{

         this.productservice.getCartList(userId);
         this.removeFromCart=true;
        })
      }
    }
  }
  removeToCart(){
    try{
      let user=localStorage.getItem('user');
      let userId=JSON.parse(user)[0].id
      if(!user){
        this.productservice.removeToCart(this.productDetail.id)
      
      }else{
        
       this.cartData&& this.productservice.removeToCartLogin(this.cartData.id).subscribe((resp)=>{
        if(resp){
          this.productservice.getCartList(userId);  
        }
       })
      }
      this.removeFromCart=false;  
    }catch{
      console.log('localStorage error')
    }
   }
}

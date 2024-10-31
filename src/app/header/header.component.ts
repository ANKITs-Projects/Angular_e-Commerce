


import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from '../data type/user-signUp';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  
})
export class HeaderComponent {
 
  
  constructor(private route: Router, private productService : ProductService){
  }
  menuType:string='default';
  sellerName:string="";
  userName:string="";
  cartItems:number=0;
  ngOnInit(): void {
    this.route.events.subscribe((event: any) => {
      if (event.url) { // Only handle navigation end events
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
          let sellerStore=localStorage.getItem('seller');
          if ( sellerStore && event.url.includes('seller')) {
            this.menuType='seller';
            let sellerData=sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName=sellerData.name;
          }
          else if (localStorage.getItem('user')){
            let userStore=localStorage.getItem('user');
            let userdata =userStore&& JSON.parse(userStore)[0];
            this.userName=userdata.name;
            this.menuType="user"
            this.productService.getCartList(userdata.id)
          }
          else {
            this.menuType='default';
          }
        } 
      }
    });

    try{
      let localitem =localStorage.getItem('localCart')
      
      if(localitem){
        this.cartItems=JSON.parse(localitem).length;
        
        
      }
    }catch{
      console.log('local Storage is empty');
    }
    this.productService.cartDataItems.subscribe((res)=>{
        this.cartItems=res.length;
        
    });
   
  }

  
              
    
  
  logOut(){
    if(typeof window !=='undefined' && typeof localStorage !=='undefined'){
      localStorage.removeItem("seller");
      this.route.navigate(['/']);
    }
  }
  userLogOut(){
    if(typeof window !=='undefined' && typeof localStorage !=='undefined'){
      localStorage.removeItem("user");
      this.route.navigate(['/']);
      this.productService.cartDataItems.emit();
    }
  }
 
}

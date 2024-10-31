import { Component } from '@angular/core';
import { cart, product, userSignIn, userSignUp } from '../data type/user-signUp';
import { UserService } from '../service/user.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  userValidation:string="";
  openForm:string="SignUp";
 constructor(private userService: UserService, private productService:ProductService){}
  ngOnInit(){
    this.userService.userAuthRelode();
  }
  signUp(data:userSignUp){
    this.userService.userSignUp(data);
  }
  signIn(data:userSignIn){
    this.userService.userSignIn(data);
    this.userService.validUser.subscribe((resp)=>{
      if(resp){
        this.userValidation="Email & Password in incorrect";
      }else{
        this.localCartToRemotCart();
      }
    });
    setTimeout(()=>{this.userValidation=""},3000)
  }
  openSignIn(){
    this.openForm="SignIn"
  }
  openSignUp(){
    this.openForm="SignUp"
  }
  localCartToRemotCart(){
    try{
      let cartData=localStorage.getItem('localCart');
      let user=localStorage.getItem('user');
      let userId=user && JSON.parse(user)[0].id;
      if(cartData){
        let cartDataList:product[]=JSON.parse(cartData);
       
        cartDataList.forEach((product:product,index)=>{
          let cartData:cart={
            ...product,
            productId:product.id,
            userId
          };
          delete cartData.id;
          setTimeout(()=>{
            this.productService.addToCartLogin(cartData).subscribe((resp)=>{
              if(resp){
                console.warn('Item Store in db')
              }
            });
            
          },500);
          if(cartDataList.length===index+1){
            localStorage.removeItem('localCart')
          }
        })
      }
      setTimeout(()=>{
        this.productService.getCartList(userId)
      },1000);
    }catch{}
  }
}

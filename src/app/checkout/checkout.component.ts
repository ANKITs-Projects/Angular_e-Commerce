import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { cart, order } from '../data type/user-signUp';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  totalPrice:number;
  cartData:cart[] | undefined;
  constructor(private productService:ProductService, private router: Router){}

  ngOnInit(){
    
    try{
       let userData= localStorage.getItem('user');
       if(userData){
       let user= userData && JSON.parse(userData)[0];
       this.productService.currentCart(user.id).subscribe((res:cart[])=>{
        this.cartData=res;
         let price =0;
         let quantity=0;
         res.forEach(element => {
          price=price+(+element.price*element.quantity)
          quantity=quantity+element.quantity;
         });
         this.totalPrice=Math.ceil((price)+(price*18/100)-(price*10/100)+(20*quantity));
       })
     }
   }catch{
     console.log('localStorage Error')
   }
   }
  ordernow(data:{address:string, contact:number}){
    try{
      let user=localStorage.getItem('user')
      if(user){
        let userId=JSON.parse(user)[0].id;
        let orderData:order={
          ...data,
          totalPrice: this.totalPrice,
          userId,
          id:undefined
        }
        this.cartData?.forEach(element => {
          setTimeout(() => {
            element.id &&this.productService.deletecartitem(element.id)
          }, 2000);
        });

        this.productService.orderNow(orderData).subscribe((resp)=>{
          if(resp){

            alert('Order Placed')

            this.router.navigate(['/myorder'])

          }
        })
      }
    }catch{
      console.log('localstorage error')
    }
    
  }
}

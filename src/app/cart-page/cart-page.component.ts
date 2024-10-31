import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { cart, priceSummary } from '../data type/user-signUp';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {

  cartProduct:cart[];
  priceSummary:priceSummary={
    price:0,
    discount:0,
    tax:0,
    deliveryFees:0,
    total:0
}
  constructor(private productService: ProductService, private router:Router){}

  ngOnInit(){
    this.lodeDetails();
  }

  checkout(){
    this.router.navigate(['/checkout'])
  }
  removeToCart(id:number){
    this.cartProduct&& this.productService.removeToCartLogin(id).subscribe((resp)=>{
      this.lodeDetails();
     })
  }
  lodeDetails(){
    

   try{
    let userData= localStorage.getItem('user');
    if(userData){
    let user= userData && JSON.parse(userData)[0];
    this.productService.currentCart(user.id).subscribe((res:cart[])=>{
      this.cartProduct=res;
      let price:number=0;
      let quantity:number=0;
      res.forEach(element => {
        
        price=price+ (+ element.quantity*element.price);
        quantity=quantity+element.quantity;
      });
      this.priceSummary.price=price;
      this.priceSummary.tax=Math.ceil(price*18/100);
      this.priceSummary.discount=Math.ceil(price*10/100);
      this.priceSummary.deliveryFees=this.priceSummary.price &&  20*quantity;
      this.priceSummary.total=Math.ceil((price)+(price*18/100)-(price*10/100)+(20*quantity))
      if(!this.cartProduct.length){
        this.router.navigate(['/'])
      }
    })
  }
}catch{
  console.log('localStorage Error')
}

  }
}

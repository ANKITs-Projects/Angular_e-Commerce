import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { order } from '../data type/user-signUp';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  orderData:order[]|undefined;
  constructor(private productService: ProductService){}

  ngOnInit(){
    this.getorderList();
  }
  cancleOrder(orderID:number|undefined){
    if(orderID){
      this.productService.deleteOrder(orderID).subscribe((resp)=>{
        this.getorderList();
      })
    }
  }
  getorderList(){
    try{
      let user=localStorage.getItem('user')
      if(user){
        let userId= JSON.parse(user)[0].id;
        this.productService.orderList(userId).subscribe((resp)=>{
          if(resp){
            this.orderData=resp;
          }
        })
      }
    }catch{console.log('LocalStorage error')}
  }
}

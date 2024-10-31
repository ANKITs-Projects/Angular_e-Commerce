import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data type/user-signUp';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartDataItems : EventEmitter<product[]> =new EventEmitter<product []>();
  constructor(private http:HttpClient) { }
  addProduct(data:product){
   return this.http.post("http://localhost:3000/products",data);
  }
  productList(){
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getProductId(id: string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }
  updateProduct(product:product){
    return this.http.put(`http://localhost:3000/products/${product.id}`,product)
  }
  popularProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }
  trendingProduct(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }  
  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  } 
  addToCart(data:product ){
    
    let cartData :product[]=[];
    if(window!= undefined && localStorage!= undefined){
      let localCartData= localStorage.getItem('localCart');
      if(!localCartData){
        localStorage.setItem('localCart',JSON.stringify([data]));
        this.cartDataItems.emit([data]);
      }else{
        cartData=JSON.parse(localCartData);
        cartData.push(data);
        localStorage.setItem('localCart',JSON.stringify(cartData));
        this.cartDataItems.emit(cartData);
      }
      
    } 
  }
  removeToCart(productId:number){
    try{
      let localCartData= localStorage.getItem('localCart');
      if(localCartData){
        let setCartItem:product[]=JSON.parse(localCartData);
        setCartItem=setCartItem.filter((item:product)=>productId!==item.id);
        localStorage.setItem('localCart',JSON.stringify(setCartItem));
        this.cartDataItems.emit(setCartItem);
      }
    }catch{

    }
  }
  addToCartLogin(cartData:cart){
    return this.http.post('http://localhost:3000/cart',cartData);
  }
  getCartList(userId:number){
    return this.http.get<product[]>('http://localhost:3000/cart?userId='+userId,{observe:'body'} )
    .subscribe((resp)=>{
      if(resp){
        this.cartDataItems.emit(resp);
      }
    });
  }

  removeToCartLogin(cartId:number){
    return this.http.delete('http://localhost:3000/cart/'+cartId);
  }
  
  currentCart(userId :number){
    return this.http.get('http://localhost:3000/cart?userid='+userId)
    
}
  orderNow(data:order){
    return this.http.post('http://localhost:3000/orders',data)
  }
  orderList(id:number){
    return this.http.get<order[]>('http://localhost:3000/orders?userid='+id)
  }
  deletecartitem(cartId:number){
    
     cartId&& this.http.delete('http://localhost:3000/cart/'+cartId).subscribe((res)=>{
        if(res){
          this.cartDataItems.emit()
        }
      })
    
  }
  deleteOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/'+orderId)
  }
}
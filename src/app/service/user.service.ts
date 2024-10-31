import { Injectable, EventEmitter } from '@angular/core';
import { userSignIn, userSignUp } from '../data type/user-signUp';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class UserService {
  validUser =new EventEmitter<boolean>(false);
  constructor(private http:HttpClient, private router: Router) { }


  userSignUp(user:userSignUp){
   this.http.post("http://localhost:3000/user",user,{observe:'body'}).subscribe((resp)=>{
    if (resp&&
      typeof window !== 'undefined' &&
      typeof localStorage !== 'undefined'
    ) {
      localStorage.setItem('user',JSON.stringify(resp));
      this.router.navigate(['/'])
    }
   })
  }

  userAuthRelode(){
    if(window !=undefined&& localStorage!=undefined){
      if(localStorage.getItem('user')){
        this.router.navigate(['/'])
    }
    }
  }
  userSignIn(user:userSignIn){
    this.http.get<any>(`http://localhost:3000/user/?email=${user.email}&password=${user.password}`,{observe:'body'})
    .subscribe((resp)=>{
      if(resp.length ){
        if( window !=undefined && localStorage!=undefined){
          localStorage.setItem('user',JSON.stringify(resp));
          this.validUser.emit(false);
          this.router.navigate(['/']);
        }      
      }else{
        this.validUser.emit(true);
      }
    })
  }
}

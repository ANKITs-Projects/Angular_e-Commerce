import { Component } from '@angular/core';
import { SellerService } from '../service/seller.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { userSignUp } from '../data type/user-signUp';

@Component({
  selector: 'seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {
  authError:string="";
  constructor(private slr:SellerService,
    private router: Router
  ){}
  ngOnInit():void{
    this.slr.reloadSeller();
  }
  showLogin:boolean=true;

  signUp(data:NgForm):void{   
    this.slr.userSignUp(data.value);
  }
  login(data:NgForm):void{
    this.authError="";
    this.slr.userSignIn(data.value);
    this.slr.isLoginError.subscribe((error)=>{
      if(error){
        this.authError="Email Id & pasword Not Match";
      }
    })    
  }
  openSignUp(){
    this.showLogin=!this.showLogin;
  }
}

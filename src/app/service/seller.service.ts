import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { userSignIn, userSignUp } from '../data type/user-signUp';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class SellerService {
  private isAutenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private http: HttpClient = inject(HttpClient);
  private rout: Router = inject(Router);
  isLoginError=new EventEmitter(false);
  userSignUp(data: userSignUp) {
    this.http
      .post<any>('http://localhost:3000/seller', data, { observe: 'body' })
      .subscribe((result) => {
        if (
          typeof window !== 'undefined' &&
          typeof localStorage !== 'undefined'
        ) {
          this.isAutenticated.next(true);
          localStorage.setItem('seller', JSON.stringify(result));
        }
        this.rout.navigateByUrl('seller-home');
      });
  }
  reloadSeller() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      if (localStorage.getItem('seller')) {
        this.isAutenticated.next(true);
        this.rout.navigateByUrl('seller-home');
      }
    }
  }
  
  userSignIn(data: userSignIn) {
    this.http
      .get<any>(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'body' }
      )
      .subscribe((result) => {
        if (result.length) {
          this.isLoginError.emit(false);
          if (
            typeof window !== 'undefined' &&
            typeof localStorage !== 'undefined'
          ) {
            this.isAutenticated.next(true);
            localStorage.setItem('seller', JSON.stringify(result));
            this.rout.navigateByUrl('seller-home');
            
          }
        } else {
          console.log('in else');
          this.isLoginError.emit(true);
        }
      });
  }
  getAuthentication(): Observable<boolean> {
    return this.isAutenticated.asObservable();
  }
}

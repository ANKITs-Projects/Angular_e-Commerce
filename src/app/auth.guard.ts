import { consumerAfterComputation } from '@angular/core/primitives/signals';
import { CanActivateFn, Router } from '@angular/router';
import { SellerService } from './service/seller.service';
import { inject, Injectable } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
   
  const authentication= inject(SellerService);
  return authentication.getAuthentication()
};

import { Injectable, NgModule } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import {AuthServiceService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

   constructor(private authService: AuthServiceService,private router: Router){}

  canActivate(): boolean{
      if(this.authService.loggedIn()){
        return true;

  }else{
     this.router.navigate([''])
  }
    
  
}
}

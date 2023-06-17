import { AuthGuardService } from './auth-guard.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(
    private authentificationService: AuthentificationService,
    private authGuardService:AuthGuardService,
    private router: Router
  ) {
    
  }
  status:string="";
  isLogin:boolean;
 
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.isLogin=this.authGuardService.canActivate();
    if(this.isLogin){
       const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.status = currentUser.status;
   console.log('type',this.status)
    if (this.status=='admin') {
      return true;
    } else {
      this.router.navigateByUrl('/404');

      return false;
    }
  }
  else
  {
    this.router.navigateByUrl('/404');

    return false;
  }
   
  }
  isAdmin()
  {   console.log('type',this.status)

    if (this.status=='admin') {
      return true;
    } else {

      return false;
    }
  }
  isInvestor()
  {
    if (this.status=='investor') {
      return true;
    } else {

      return false;
    }
  }
}

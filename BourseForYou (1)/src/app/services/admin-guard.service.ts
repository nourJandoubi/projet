import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(
    private authentificationService: AuthentificationService,
    private router: Router
  ) {
    
  }
  status:string;
 
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.status = currentUser.status;
   console.log('type',this.status)
    if (this.status=='admin') {
      return true;
    } else {
      this.router.navigateByUrl('/accueil');

      return false;
    }
  }
  isAdmin()
  {
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

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
  ) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const status = currentUser.status;

    if (status=='admin') {
      return true;
    } else {
      this.router.navigateByUrl('/login');

      return false;
    }
  }
}

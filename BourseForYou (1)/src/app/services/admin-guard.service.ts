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
    if (this.authentificationService.isAdmin()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');

      return false;
    }
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authentificationService: AuthentificationService,
    private router: Router
  ) {}
  canActivate() {
    if (!this.authentificationService.isLogedIn()) {
      this.router.navigateByUrl('/404');
      return false;
    } else {
      return true;
    }
  }
}

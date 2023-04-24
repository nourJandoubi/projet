import { AuthentificationService } from 'src/app/services/authentification.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLogedIn: boolean;
  faSignOut=faSignOut;
  constructor( private authentificationService: AuthentificationService,
    private router: Router)
  {}
  ngOnInit(): void {
    this.isLogedIn =
      localStorage.getItem('TOKEN') != null &&
      localStorage.getItem('TOKEN') != 'undefined';
    }
    deconnexion() {
      //this.authentificationService.logOut();
      localStorage.clear();

      this.router.navigateByUrl('/signIn');
      this.ngOnInit();
    }

}

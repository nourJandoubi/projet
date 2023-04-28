import { AdminGuardService } from './../../services/admin-guard.service';
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
  constructor( 
    private authentificationService: AuthentificationService,
    private router: Router,
    private adminGuardService:AdminGuardService)
  {}
  admin:boolean=false;
  investor:boolean=false;
  ngOnInit(): void {


    this.isLogedIn =
      localStorage.getItem('TOKEN') != null &&
      localStorage.getItem('TOKEN') != 'undefined';
       console.log('login',this.isLogedIn)
       if(!this.isLogedIn)
       {
        this.admin=false;
        this.investor=false;
       }
      else{
        this.admin=this.adminGuardService.isAdmin();
        this.investor=this.isLogedIn && !this.admin;     
      }
      console.log('admin',this.admin)
      console.log('investor',this.investor)
    }
    deconnexion() {
      //this.authentificationService.logOut();
      this.admin=false;
      this.investor=false;


      localStorage.clear();
      

      this.router.navigateByUrl('/signIn');
      this.ngOnInit();
    }


}

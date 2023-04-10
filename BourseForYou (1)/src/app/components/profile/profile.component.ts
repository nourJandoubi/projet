import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthentificationService } from './../../services/authentification.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private routeSub: Subscription;
  user: any = {};
  userForm:FormGroup;
  constructor( 
    private authentificationService: AuthentificationService,
    private router: Router,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private _snackBar:MatSnackBar
    
    )
    {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log('user after login',this.user)
   

    this.userForm=new FormGroup({
      name:new FormControl(),
      email:new FormControl(),
      password:new FormControl()
    });
    this.userForm=this.formBuilder.group({
      name:[this.user.name,Validators.required],
      email:[this.user.email,Validators.required],
      password:[this.user.password,Validators.required],


    })
  
  }
  deconnexion() {
    this.authentificationService.logOut();
    this.ngOnInit();
  }

}

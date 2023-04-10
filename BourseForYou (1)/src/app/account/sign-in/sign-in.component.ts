import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{
  userFormGroup: FormGroup = new FormGroup({});
  hide = true;
  constructor(
    private _formBuilder: FormBuilder,
    private authentificationService: AuthentificationService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {}


  openSnackBar() {
    this._snackBar.open('Connecté', 'OK.', {
      verticalPosition: 'top',
      duration: 5000,
      panelClass: 'notif-success',
    });
  }
  errorSnackBar(msg: string) {
    this._snackBar.open(msg, 'Erreur.', {
      verticalPosition: 'top',
      duration: 5000,
      panelClass: 'notif-success',
    });
  }

  login() {
    this.authentificationService
      .signin(this.userFormGroup.value)
      .subscribe((res) => {
        if (res) {
          this.openSnackBar();
          if (
            this.authentificationService.currentUserValue.__type == 'User'
          ) {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/profile']);
          }
        } else {
          this.errorSnackBar('error');
        }
      });
  }

  ngOnInit(): void {
    this.userFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }




}

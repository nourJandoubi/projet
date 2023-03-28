import { AuthentificationService } from './../../services/authentification.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  UserFormGroup: FormGroup = new FormGroup({});

  constructor(
    private _formBuilder: FormBuilder,
    private authentificationService: AuthentificationService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ){}
  openSnackBar() {
    this._snackBar.open('Compte ajouté avec succès !', 'OK.', {
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
  ngOnInit(): void {
    this.UserFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required,Validators.minLength(8)],
    });
    
  }

  signUp() {
    const form_data = new FormData();
    const formData = {
      ...this.UserFormGroup.value,
      
    };
    for (var key in formData) {
      form_data.append(key, formData[key]);
    }

    this.authentificationService.signup(formData).subscribe((res) => {
      if (res) {
        this.openSnackBar();
        this.router.navigate(['/home']);
      } else {
        this.errorSnackBar('error');
      }
    });
  }
get password()
{
  return this.UserFormGroup.get('password');
}
}

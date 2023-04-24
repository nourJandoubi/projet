import { AdminService } from 'src/app/services/admin.service';
import { AdminGuardService } from './../../services/admin-guard.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Message,MessageService } from 'primeng/api';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers:[MessageService]

})
export class SignInComponent implements OnInit{
  userFormGroup: FormGroup = new FormGroup({});
  hide = true;
  value:string;
  motdepasse:string="password";
  eye:boolean=true;
  constructor(
    private _formBuilder: FormBuilder,
    private authentificationService: AuthentificationService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private messageService: MessageService,
    private adminService:AdminService
  ) {}
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
}
  openSnackBar() {
    this._snackBar.open('Connecté', 'OK.', {
      duration: 5000,
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition,
      panelClass: ['notif-success'],
    });
  }
  
  errorSnackBar(msg: string) {
    this._snackBar.open(msg, 'Erreur.', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['notif-error'],
    });
  }
  eyes()
  {
    this.eye=!this.eye;
    if(this.eye)
    {this.motdepasse="password";}
    else
    {this.motdepasse="text";}
    
    
  }
  login() {
    let status:boolean;

    this.authentificationService
      .signin(this.userFormGroup.value)
      .subscribe((res) => {
        if (res) {
          console.log('resss',res)
          this.show();
          //this.openSnackBar();
          

           if(res.status=='admin')
           this.router.navigate(['/admin']);
           else
            this.router.navigate(['/profile']);
        
        } else {
          this.errorSnackBar('error');
        }
      });
 
  }
  togglePassword(passwordInput: HTMLInputElement): void {
    const toggleButton = document.querySelector('.toggle-password');
    toggleButton.classList.toggle('fa-eye');
    toggleButton.classList.toggle('fa-eye-slash');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  }
  ngOnInit(): void {
    this.userFormGroup = this._formBuilder.group({
      email: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}' )]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!$@%])[a-zA-Z0-9!$@%]{6,}$')]],
    });
  }


  get password()
  {
    return this.userFormGroup.get('password');
  }
  get email()
{
  return this.userFormGroup.get('email');
}

}

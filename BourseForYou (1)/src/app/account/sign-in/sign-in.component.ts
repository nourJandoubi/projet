import { PasswordService } from './../../services/password.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers:[MessageService]

})
export class SignInComponent implements OnInit{
  userFormGroup: FormGroup = new FormGroup({});
  value:string;
  motdepasse:string="password";
  eye:boolean=true;
  error:boolean=false;
  emailVide:boolean=false;
  emailEnvoyer:boolean=false;
  hide = true;

  constructor(
    private _formBuilder: FormBuilder,
    private authentificationService: AuthentificationService,
    private router: Router,
    private messageService: MessageService,
    private passwordService:PasswordService
  ) {}
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
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
 
          this.error=false;

           if(res.status=='admin')
           this.router.navigate(['/admin']);
           else
            this.router.navigate(['/home']);
        
        } else {
          this.error=true;
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
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!$@%]{6,}$')]],
    });
  }

  forgotPassword()
  {
    if(this.userFormGroup.get('email').value=="")
    {
      this.emailVide=true;
    }
    else
    {
      this.emailVide=false;
      this.passwordService.forgetPassword(this.userFormGroup.value).subscribe(
        (res)=>
        {
          this.emailEnvoyer=true;
        }
      )
    }

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

import { HttpClient } from '@angular/common/http';
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
  countriestable: any[];
  countries:any[]=[];

  motdepasse:string="password";
  eye:boolean=true;

  selectedCity: string;
  cities=[]
  constructor(
    private _formBuilder: FormBuilder,
    private authentificationService: AuthentificationService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient

  ){}
  eyes()
  {
    this.eye=!this.eye;
    if(this.eye)
    {this.motdepasse="password";}
    else
    {this.motdepasse="text";}
    
    
  }
  togglePassword(passwordInput: HTMLInputElement): void {
    const toggleButton = document.querySelector('.toggle-password');
    toggleButton.classList.toggle('fa-eye');
    toggleButton.classList.toggle('fa-eye-slash');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  }
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
      lastName: ['', Validators.required],
      email: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}' )]],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!$@%])[a-zA-Z0-9!$@%]{6,}$')]],

    });

    //get list of coubtries
    this.http.get<any[]>('https://restcountries.com/v3.1/all')
    .subscribe((data: any[]) => {
      console.log('dataaa',data)
      this.countries =data.sort((a, b) => a.name.common.localeCompare(b.name.common)); // trier le tableau par ordre alphabétique
      /*this.countriestable.forEach(element => {
      this.countries.push(element.name.common)
        
      });*/

    });
    
  }

  signUp() {
    const form_data = new FormData();
    const formData = {
      ...this.UserFormGroup.value,
      
    };
    console.log('form data',formData)
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
get name()
{
  return this.UserFormGroup.get('name');
}
get lastName()
{
  return this.UserFormGroup.get('lastName');
}
get email()
{
  return this.UserFormGroup.get('email');
}
get country()
{
  return this.UserFormGroup.get('country');
}
}

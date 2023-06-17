import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from './../../services/authentification.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  UserFormGroup: FormGroup = new FormGroup({});
  passwordFormGroup:FormGroup=new FormGroup({});
  countriestable: any[];
  countries:any[]=[];

  motdepasse:string="password";
  motdepasse2:string="password";
  eye:boolean=true;
  eye2:boolean=true;
  selectedCity: string;
  errorSignUp:boolean=false;
  emailError:boolean=false;
  cities=[]
  signUpDisabled: boolean=true;
  constructor(
    private _formBuilder: FormBuilder,
    private authentificationService: AuthentificationService,
    private router: Router,
    private http: HttpClient

  ){}
  eyes(i:any)
  {
    if(i==1)
    {this.eye=!this.eye;
    if(this.eye)
    {this.motdepasse="password";}
    else
    {this.motdepasse="text";}
    }
    if(i==2)
    {this.eye2=!this.eye2;
    if(this.eye2)
    {this.motdepasse2="password";}
    else
    {this.motdepasse2="text";}
    }
    
    
  }
  togglePassword(passwordInput: HTMLInputElement): void {
    const toggleButton = document.querySelector('.toggle-password');
    toggleButton.classList.toggle('fa-eye');
    toggleButton.classList.toggle('fa-eye-slash');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  }
    //verifier comptabilité des deux mot de passes
  verifPassword()
   {   
    if(this.UserFormGroup.controls['password'].value==this.passwordFormGroup.controls['password1'].value)
      {   
          if(this.UserFormGroup.controls['password'].value=='' && this.passwordFormGroup.controls['password1'].value=='')
            {
              this.signUpDisabled=true;
              return false;
            }
            else
            {
              this.signUpDisabled=false;
              return false;
            }
      }
      else
      { this.signUpDisabled=true;
        return true;
      }
   }

  
  ngOnInit(): void {

 
    this.UserFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}' )]],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!$@%]{6,}$')]],

    });
    
    this.passwordFormGroup = this._formBuilder.group({
      password1: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!$@%]{6,}$')]],

    });

    //get list of coubtries
    this.http.get<any[]>('https://restcountries.com/v3.1/all')
    .subscribe((data: any[]) => {
      this.countries =data.sort(
        (a, b) => a.name.common.localeCompare(b.name.common)
        ); 
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
    this.authentificationService.verifierEmail(formData).toPromise()
    .then((success)=>{

      if(!success.success)
      {
        this.emailError=true;

      }
      else
      {
        this.emailError=false;
        this.authentificationService.signup(formData).subscribe((res) => {
          if (res)
           {
            this.errorSignUp=false;
            this.router.navigate(['/home']);
          } 
          else 
          {
              this.errorSignUp=true;
          }
        });
      }

    })

  
  }
  get password1()
{
  return this.passwordFormGroup.get('password1');
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

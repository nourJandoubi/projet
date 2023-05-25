import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import {MatMenuTrigger} from '@angular/material/menu';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { TimeScale } from 'chart.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']


})
export class ProfileComponent implements OnInit {
  
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  faSignOut=faSignOut;
  
  private routeSub: Subscription;
  user: any = {};
  userForm:FormGroup;
  user2Form:FormGroup;

  passwordForm:FormGroup;
  countries: any[];
  idUser:any;
  updateDisabled=true;
  motdepasse:string="password";
  motdepasse2:string="password";
  motdepasse3:string="password";
  motdepasseIncorrect:boolean=false;

  eye:boolean=true;
  eye2:boolean=true;
  eye3:boolean=true;
  confirmation:boolean=false;
  confirmationError:boolean=false;

  constructor( 
    private authentificationService: AuthentificationService,
    private router: Router,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private _snackBar:MatSnackBar,
    private http: HttpClient
    )
    {}
  ngOnInit(): void {
    //get current user
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log('user after login',this.user)
    this.idUser=this.user._id;
    // contient le mot de passe actuel
    this.user2Form=new FormGroup({
      email:new FormControl(),
      password:new FormControl(this.user.password)
    });
    this.user2Form=this.formBuilder.group({
      email:[this.user.email,Validators.required],
      password:[this.user.password, [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!$@%])[a-zA-Z0-9!$@%]{6,}$')]],
    });
    //contient le mot de passe a changer
    this.userForm=new FormGroup({
      name:new FormControl(),
      lastName:new FormControl(),
      email:new FormControl(),
      country:new FormControl(),
      password:new FormControl(this.user.password)
    });
    this.userForm=this.formBuilder.group({
      name:[this.user.name,Validators.required],
      lastName:[this.user.lastName,Validators.required],
      email: [this.user.email,[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}' )]],
      country:[this.user.country,Validators.required],
      password:[this.user.password],

    });
    this.passwordForm=new FormGroup(
      {
        lastPassword:new FormControl(),
        firstPassword:new FormControl(),
        secondPassword:new FormControl(),
      }
    );
    this.passwordForm=this.formBuilder.group(
      {
        lastPassword:['',[Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!$@%])[a-zA-Z0-9!$@%]{6,}$')]],
        firstPassword:['',[Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!$@%])[a-zA-Z0-9!$@%]{6,}$')]],
        secondPassword:['',[Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!$@%])[a-zA-Z0-9!$@%]{6,}$')]],
      }
    )


    //get list of coubtries
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe((data: any[]) => {
      this.countries =data.sort((a, b) => a.name.common.localeCompare(b.name.common)); // trier le tableau par ordre alphabétique
    });

 
  }
//show password
  eyes(i:any)
{ if(i==1)
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
  if(i==3)
  {this.eye3=!this.eye3;
  if(this.eye3)
  {this.motdepasse3="password";}
  else
  {this.motdepasse3="text";}
  }
  
  
}
  //verifier comptabilité des deux mot de passes
  verifPassword()
   {   
    if(this.passwordForm.controls['firstPassword'].value==this.passwordForm.controls['secondPassword'].value)
      {   
          if(this.passwordForm.controls['firstPassword'].value=='' && this.passwordForm.controls['secondPassword'].value=='')
            {
              this.updateDisabled=true;
              return false;
            }
            else
            {
              this.updateDisabled=false;
              return false;
            }
      }
      else
      { this.updateDisabled=true;
        return true;
      }
   }
   deconnexion() {
    //this.authentificationService.logOut();
    localStorage.clear();

    this.router.navigateByUrl('/signIn');
    //this.ngOnInit();
  }

 
 updateInfo()
  { this.authentificationService.updateUser(this.userForm.value).subscribe(
    data=>
    { 
      window.location.reload();
    }
  );
 }

 updatePassword()
 { 
  this.user2Form=this.formBuilder.group({  
    email:[this.user.email],
    password:[this.passwordForm.controls['lastPassword'].value],

  });  
  this.userForm=this.formBuilder.group({
    name:[this.user.name],
    lastName:[this.user.lastName],
    email: [this.user.email],
    country:[this.user.country],
    password:[this.passwordForm.controls['firstPassword'].value]

  });
  this.authentificationService.updatePassword(this.userForm.value,this.user2Form.value).subscribe(
   data=>
   {    
   if(data)
   {
    this.motdepasseIncorrect=false;
    this.updateInfo()
   }
   else{
    this.motdepasseIncorrect=true;
    console.log('profile: mot de passe incorrect')
   }
    
   }
 );

}


supprimerCompte()
{
    console.log('confirmation type',this.confirmation)
    if(this.confirmation)
    {
      this.authentificationService.supprimerCompte(this.idUser).subscribe(
        ()=>{
          localStorage.clear();

          this.router.navigateByUrl('/signIn');
                }
      )
    }
    else
    {
      this.confirmationError=true;
    }
}
//get of value from userForm and passwordForm
get password()
{
  return this.userForm.get('password');
}
get name()
{
  return this.userForm.get('name');
}
get lastName()
{
  return this.userForm.get('lastName');
}
get email()
{
  return this.userForm.get('email');
}
get country()
{
  return this.userForm.get('country');
}
get firstPassword()
{
  return this.passwordForm.get('firstPassword');
}
get secondPassword()
{
  return this.passwordForm.get('secondPassword');
}
get lastPassword()
{
  return this.passwordForm.get('lastPassword');
}
}

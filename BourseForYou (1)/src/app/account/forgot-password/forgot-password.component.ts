import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PasswordService } from './../../services/password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  constructor(
    private activatedRoute:ActivatedRoute,
    private passwordService:PasswordService,
    private formBuilder:FormBuilder,
    private router: Router
  )
  {}
  token=this.activatedRoute.snapshot.params['token'];
  passwordForm:FormGroup;
  motdepasse1:string="password";
  motdepasse2:string="password";
  updateDisabled=true;
  eye1:boolean=true;
  eye2:boolean=true;

  ngOnInit():void
  { 
    this.passwordForm=new FormGroup(
      {
        password:new FormControl(),
        secondPassword:new FormControl()
      })
    this.passwordForm=this.formBuilder.group(
      {
        password:['',[Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!$@%]{6,}$')]],
        secondPassword:['',[Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!$@%]{6,}$')]],
      })   
  }

eyes(i:any)
    { if(i==1)
        {
          this.eye1=!this.eye1;
          if(this.eye1)
            {this.motdepasse1="password";}
          else
            {this.motdepasse1="text";}
        }
      if(i==2)
        {
          this.eye2=!this.eye2;
          if(this.eye2)
            {this.motdepasse2="password";}
          else
            {this.motdepasse2="text";}
        }  
    }
verifPassword()
{   
 if(this.passwordForm.controls['password'].value==this.passwordForm.controls['secondPassword'].value)
   {   
      if(this.passwordForm.controls['password'].value=='' && this.passwordForm.controls['secondPassword'].value=='')
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
   { 
     this.updateDisabled=true;
     return true;
   }
}
updatePassword()
{
   this.passwordService.resetPassword(this.token,this.passwordForm.value).subscribe(
      (res)=>
      {
        this.router.navigate(['/profile']);
      }
    )
}
get password()
{
  return this.passwordForm.get('password');
}
get secondPassword()
{
  return this.passwordForm.get('secondPassword');
}
}

import { SignUpComponent } from './account/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualiteDetailsComponent } from './components/actualite-details/actualite-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [

  {path:"signIn",component:SignInComponent},
  {path:"signUp",component:SignUpComponent},
  {path:"home",component:HomeComponent},
  {path: 'home/:id', component:ActualiteDetailsComponent},
  {path:"profile",
   component:ProfileComponent,
   canActivate:[AuthGuardService]
},
  {path:'',redirectTo:'home',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

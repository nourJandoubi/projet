import { CountryComponent } from './admin/country/country.component';
import { InvestorComponent } from './admin/investor/investor.component';
import { VisitorComponent } from './admin/visitor/visitor.component';
import { AdminGuardService } from './services/admin-guard.service';
import { AdminComponent } from './components/admin/admin.component';
import { SignUpComponent } from './account/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualiteDetailsComponent } from './components/actualite-details/actualite-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { DeviseComponent } from './components/devise/devise.component';
import { ActionsComponent } from './components/actions/actions.component';
import { DevisesDetailsComponent } from './components/devises-details/devises-details.component';
import { AccueilComponent } from './components/accueil/accueil.component';

const routes: Routes = [

  {path:"signIn",component:SignInComponent},
  {path:"devise",component:DeviseComponent},
  {path:"accueil",component:AccueilComponent},
  {path: 'devise/:id/:selectedDevise/:devise', component:DevisesDetailsComponent},
  {path:"signUp",component:SignUpComponent},
  {path:"home",component:HomeComponent},
  {path:"home",component:ActionsComponent},
  {path: 'home/:nomBourse', component:HomeComponent},
  {path: 'home/:id', component:ActualiteDetailsComponent},
  {path:'visitor',component:VisitorComponent},
  {path:'investor',component:InvestorComponent},
  {path:'country',component:CountryComponent},
  {path:"profile",
   component:ProfileComponent,
   canActivate:[AuthGuardService]
  },
  {path:"admin",
  component:AdminComponent,
  canActivate:[AdminGuardService]
},
  {path:'',redirectTo:'home',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

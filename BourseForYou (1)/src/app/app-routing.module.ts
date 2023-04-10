import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './account/sign-up/sign-up.component';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualiteDetailsComponent } from './components/actualite-details/actualite-details.component';
import { DeviseComponent } from './components/devise/devise.component';
import { ActionsComponent } from './components/actions/actions.component';
import { DevisesDetailsComponent } from './components/devises-details/devises-details.component';

const routes: Routes = [

  {path:"signIn",component:SignInComponent},
  {path:"devise",component:DeviseComponent},
  {path: 'devise/:id/:selectedDevise/:devise', component:DevisesDetailsComponent},
  {path:"signUp",component:SignUpComponent},
  {path:"home",component:HomeComponent},
  {path:"home",component:ActionsComponent},
  {path: 'home/:location/:pageNumber', component:HomeComponent},
  {path: 'home/:id', component:ActualiteDetailsComponent},
  
  {path:'',redirectTo:'home',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

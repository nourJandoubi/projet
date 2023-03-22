import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './account/sign-up/sign-up.component';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualiteDetailsComponent } from './components/actualite-details/actualite-details.component';

const routes: Routes = [

  {path:"signIn",component:SignInComponent},
  {path:"signUp",component:SignUpComponent},
  {path:"home",component:HomeComponent},
  {path: 'home/:id', component:ActualiteDetailsComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

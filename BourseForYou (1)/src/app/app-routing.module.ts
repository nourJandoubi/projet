import { ActualitesComponent } from './components/actualites/actualites.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { ModifierPortefeuilleComponent } from './investor/modifier-portefeuille/modifier-portefeuille.component';
import { HistoriqueComponent } from './investor/historique/historique.component';
import { PortefeuilleComponent } from './investor/portefeuille/portefeuille.component';
import { ListePortefeuilleComponent } from './investor/liste-portefeuille/liste-portefeuille.component';
import { AjouterPortefeuilleComponent } from './investor/ajouter-portefeuille/ajouter-portefeuille.component';
import { NotFound404Component } from './components/not-found404/not-found404.component';
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
import { ProfileComponent } from './investor/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { DeviseComponent } from './components/devise/devise.component';
import { ActionsComponent } from './components/actions/actions.component';
import { DevisesDetailsComponent } from './components/devises-details/devises-details.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { EntrepriseComponent } from './components/entreprise/entreprise.component';
import { IndiceComponent } from './components/indice/indice.component';

const routes: Routes = [

  {path:"signIn",component:SignInComponent},
  {path:"devise",component:DeviseComponent},
  {path:"accueil",component:AccueilComponent},
  {path:'home/:nomBourse',component:HomeComponent},
  {path:'devise/:id/:selectedDevise/:devise', component:DevisesDetailsComponent},
  {path:'entreprise/:id', component:EntrepriseComponent},
  {path:'actualite/:id', component:ActualiteDetailsComponent},
  {path:'actualites',component:ActualitesComponent},
  {path:"signUp",component:SignUpComponent},
  { path: 'indice', component:IndiceComponent },
  {path:"home",component:HomeComponent},
  {path:"reset-password/:token",component:ForgotPasswordComponent},
  {path:"loader",component:LoaderComponent},
  {path:"404",component:NotFound404Component},
  //{path:"home",component:ActionsComponent},
 
  {path:'visitor',
  component:VisitorComponent,
  canActivate:[AdminGuardService]},
  {path:'investor',
  component:InvestorComponent,
  canActivate:[AdminGuardService]
},
  {path:'country',
  component:CountryComponent,
  canActivate:[AdminGuardService]},
  {path:"profile",
   component:ProfileComponent,
   canActivate:[AuthGuardService]
  },
  {path:'ajouterPortefeuille',
  component:AjouterPortefeuilleComponent
  },
  {path:'listePortefeuille',
  component:ListePortefeuilleComponent,
  //canActivate:[AuthGuardService]
  },
  {path:'portefeuille/:id',
  component:PortefeuilleComponent,
  canActivate:[AuthGuardService]
  },
  {path:'historique/:id',
  component:HistoriqueComponent,
  canActivate:[AuthGuardService]
  },
  {path:'modifierPortefeuille/:id',
  component:ModifierPortefeuilleComponent,
  canActivate:[AuthGuardService]

  },

  {path:"admin",
  component:AdminComponent,
  canActivate:[AdminGuardService]
},
  {path:'',redirectTo:'accueil',pathMatch:'full'},
  {path:'**',component:NotFound404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

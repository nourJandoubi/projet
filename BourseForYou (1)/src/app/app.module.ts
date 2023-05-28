import { SignUpComponent } from './account/sign-up/sign-up.component';
import { ProfileComponent } from './investor/profile/profile.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ActualiteDetailsComponent } from './components/actualite-details/actualite-details.component';
import { HighlightNumberPipe } from './pipes/highlight-number.pipe';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectModule } from '@angular/material/select';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { MessagesModule } from 'primeng/messages';
import { IconeDevisePipe } from './pipes/icone-devise.pipe';
import { HighlightSignPipe } from './pipes/highlight-sign.pipe';
import { ActionsComponent } from './components/actions/actions.component';
import { ActualitesComponent } from './components/actualites/actualites.component';
import { DeviseComponent } from './components/devise/devise.component';
import { DevisesDetailsComponent } from './components/devises-details/devises-details.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AdminComponent } from './components/admin/admin.component';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { VisitorComponent } from './admin/visitor/visitor.component';
import { InvestorComponent } from './admin/investor/investor.component';
import { CountryComponent } from './admin/country/country.component';
import { NotFound404Component } from './components/not-found404/not-found404.component';
import { FieldsetModule } from 'primeng/fieldset';
import { AjouterPortefeuilleComponent } from './investor/ajouter-portefeuille/ajouter-portefeuille.component';
import { ListePortefeuilleComponent } from './investor/liste-portefeuille/liste-portefeuille.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HistoriqueComponent } from './investor/historique/historique.component';
import { PortefeuilleComponent } from './investor/portefeuille/portefeuille.component';
import { ModifierPortefeuilleComponent } from './investor/modifier-portefeuille/modifier-portefeuille.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { EntrepriseComponent } from './components/entreprise/entreprise.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { LoaderComponent } from './components/loader/loader.component';
import { IndiceComponent } from './components/indice/indice.component';
import { AideComponent } from './components/aide/aide.component';
@NgModule({
  declarations: [
    
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    SignInComponent,
    ActualiteDetailsComponent,
    ProfileComponent,
    SignUpComponent,
    ActualiteDetailsComponent,
    HighlightNumberPipe,
    IconeDevisePipe ,
    HighlightSignPipe,
    
    ActionsComponent,
    ActualitesComponent,
    DeviseComponent,
    DevisesDetailsComponent,
    AccueilComponent,
 
    AdminComponent,
       VisitorComponent,
       InvestorComponent,
       CountryComponent,
       NotFound404Component,
       AjouterPortefeuilleComponent,
       ListePortefeuilleComponent,
       HistoriqueComponent,
       PortefeuilleComponent,
       ModifierPortefeuilleComponent,
       EntrepriseComponent,
       ForgotPasswordComponent,
       LoaderComponent,
       IndiceComponent,
       AideComponent,

       
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatPaginatorModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatTabsModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatSelectModule,
    ToastModule,
    TooltipModule,
    DropdownModule,
    InputTextModule,
    PaginatorModule,
    MessagesModule,
    CardModule,
    DialogModule,
    ButtonModule,
    ChartModule,
    CalendarModule,
    FieldsetModule,
    ConfirmDialogModule,
    RadioButtonModule,
    AccordionModule
    
    
  ],
  providers: [], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent]
})
export class AppModule {}

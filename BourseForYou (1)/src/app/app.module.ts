import { SignUpComponent } from './account/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgModule } from '@angular/core';
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
import { IconeDevisePipe } from './pipes/icone-devise.pipe';
import { HighlightSignPipe } from './pipes/highlight-sign.pipe';
import { ActionsComponent } from './components/actions/actions.component';
import { ActualitesComponent } from './components/actualites/actualites.component';
import { DeviseComponent } from './components/devise/devise.component';
import { DevisesDetailsComponent } from './components/devises-details/devises-details.component';


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
    MatSnackBarModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

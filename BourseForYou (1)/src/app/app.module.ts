import { SignUpComponent } from './account/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';
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

import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
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
    CalendarModule
    
    
  ],
  providers: [], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent]
})
export class AppModule {}

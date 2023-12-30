import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { HomeComponent } from './components/home/home.component';
import { CoursComponent } from './components/cours/cours.component';
import { LocalComponent } from './components/local/local.component';
import { FormateurComponent } from './components/formateur/formateur.component';
import { SessionCoursComponent } from './components/session-cours/session-cours.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { NewcoursComponent } from './components/newcours/newcours.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditcoursComponent } from './components/editcours/editcours.component';
import { NewsessioncoursComponent } from './components/newsessioncours/newsessioncours.component';
import { EditsessioncoursComponent } from './components/editsessioncours/editsessioncours.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    HomeComponent,
    CoursComponent,
    LocalComponent,
    FormateurComponent,
    SessionCoursComponent,
    NewcoursComponent,
    EditcoursComponent,
    NewsessioncoursComponent,
    EditsessioncoursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

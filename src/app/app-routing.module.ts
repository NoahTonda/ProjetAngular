import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoursComponent} from './components/cours/cours.component';
import {LocalComponent} from './components/local/local.component';
import {SessionCoursComponent} from './components/session-cours/session-cours.component';
import {FormateurComponent} from
    './components/formateur/formateur.component';
import {HomeComponent} from './components/home/home.component';
import {NewcoursComponent} from "./components/newcours/newcours.component";
import {EditcoursComponent} from "./components/editcours/editcours.component";
import {NewsessioncoursComponent} from "./components/newsessioncours/newsessioncours.component";
import {EditsessioncoursComponent} from "./components/editsessioncours/editsessioncours.component";
const routes: Routes = [
  {path: 'cours', component: CoursComponent},
  {path: 'formateur', component: FormateurComponent},
  {path: 'sessionCours', component: SessionCoursComponent},
  {path: 'local', component: LocalComponent},
  {path: '', component: HomeComponent},
  {path:"newCours",component:NewcoursComponent},
  {path:"editCours/:idcours",component:EditcoursComponent},
  {path:"newSessionCours",component:NewsessioncoursComponent},
  {path:"editSessionCours/:idSessionCours",component:EditsessioncoursComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

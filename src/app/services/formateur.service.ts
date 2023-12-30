import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Formateur} from '../entities/formateur.entities';
@Injectable({providedIn:"root"}) //providedIn:"root" permet de rendre accessible cette classe partout dans l'application
export class FormateurService{
  private host = environment.host;
  constructor(private http: HttpClient) {
  }
  getFormateur(idformateur: number): Observable<Formateur>{
    return this.http.get<Formateur>(this.host + '/formateur/' + idformateur);
  }
  searchFormateurUnique(nom: string,prenom:string,tel:string):
    Observable<Formateur[]>{
    return this.http.get<Formateur[]>(this.host +
      '/formateur/'+nom+'/'+prenom+'/'+tel);
  }


  searchFormateurs(nom: string): Observable<Formateur[]>{
    return this.http.get<Formateur[]>(this.host + '/formateur/nom=' + nom);
  }
  deleteFormateur(c: Formateur): Observable<void>{
    return this.http.delete<void>(this.host + '/formateur/' + c.id);
  }
  save(c: Formateur): Observable<Formateur>{
    return this.http.post<Formateur>(this.host + '/formateur/', c);
  }

  updateFormateur(c: Formateur): Observable<Formateur>{
    return this.http.put<Formateur>(this.host + '/formateur/' + c.id, c);
  }
  getAll(): Observable<Formateur[]> {
    return this.http.get<any[]>(this.host + '/formateur/all');
  }
}

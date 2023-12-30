import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Cours} from '../entities/cours.entities';
@Injectable({providedIn:"root"}) //providedIn:"root" permet de rendre accessible cette classe partout dans l'application
export class CoursService{
  private host = environment.host;
  constructor(private http: HttpClient) {
  }
  getCours(idcours: number): Observable<Cours>{
    return this.http.get<Cours>(this.host + '/cours/' + idcours);
  }

  searchCoursUnique(nom: string,prenom:string,tel:string):
    Observable<Cours[]>{
    return this.http.get<Cours[]>(this.host +
      '/cours/'+nom+'/'+prenom+'/'+tel);
  }
  getCoursMatiere(matiere: string): Observable<Cours[]>{
    return this.http.get<Cours[]>(this.host + '/cours/matiere=' + matiere);
  }
  deleteCours(c: Cours): Observable<void>{
    return this.http.delete<void>(this.host + '/cours/' + c.id);
  }
  save(c: Cours): Observable<Cours>{
    return this.http.post<Cours>(this.host + '/cours', c);
  }

  updateCours(c: Cours): Observable<Cours>{
    return this.http.put<Cours>(this.host + '/cours/' + c.id, c);
  }
  getAll(): Observable<Cours[]> {
    return this.http.get<any[]>(this.host + '/cours/all');
  }
}

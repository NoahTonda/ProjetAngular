import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {SessionCours} from '../entities/sessionCours.entities';
import {Cours} from '../entities/cours.entities';
import {Formateur} from "../entities/formateur.entities";
import {Local} from "../entities/local.entities";
import {formatDate} from '@angular/common';
@Injectable({providedIn:"root"})
export class SessionCoursService{
  private host = environment.host;
  constructor(private http: HttpClient) {
  }
  deleteSessionCours(sc: SessionCours): Observable<void>{
    return this.http.delete<void>(this.host + '/sessionCours/' +sc.id);
  }
  save(sc: SessionCours): Observable<SessionCours>{

    return this.http.post<SessionCours>(this.host + '/sessionCours',sc);
  }
  updateSessionCours(sc: SessionCours): Observable<SessionCours>{
    return this.http.put<SessionCours>(this.host + '/sessionCours/' +
      sc.id, sc);
  }
  getSessionCours(id: number): Observable<SessionCours>{
    return this.http.get<SessionCours>(this.host + '/sessionCours/' + id);
  }
  getSessionsCoursCours(id: number) : Observable<SessionCours[]>{
    return this.http.get<SessionCours[]>(this.host + '/sessionCours/idcours=' +
      id);
  }
  getSessionsCoursFormateur(idFormateur: number) : Observable<SessionCours[]>{
    return this.http.get<SessionCours[]>(this.host + '/sessionCours/idformateur=' +
      idFormateur);
  }
  getSessionsCoursLocal(idLocal: number) : Observable<SessionCours[]>{
    return this.http.get<SessionCours[]>(this.host + '/sessionCours/idlocal=' +
      idLocal);
  }
  getAll(): Observable<SessionCours[]> {
    return this.http.get<any[]>(this.host + '/sessionCours/all');
  }
}

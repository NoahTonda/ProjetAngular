import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Local} from '../entities/local.entities';
@Injectable({providedIn:"root"}) //providedIn:"root" permet de rendre accessible cette classe partout dans l'application
export class LocalService{
  private host = environment.host;
  constructor(private http: HttpClient) {
  }
  getLocal(idlocal: number): Observable<Local>{
    return this.http.get<Local>(this.host + '/local/' + idlocal);
  }
  searchLocalUnique(nom: string,prenom:string,tel:string):
    Observable<Local[]>{
    return this.http.get<Local[]>(this.host +
      '/local/'+nom+'/'+prenom+'/'+tel);
  }


  searchLocal(sigle: string): Observable<Local[]>{
    return this.http.get<Local[]>(this.host + '/local/sigle=' + sigle);
  }
  deleteLocal(c: Local): Observable<void>{
    return this.http.delete<void>(this.host + '/local/' + c.id);
  }
  save(c: Local): Observable<Local>{
    return this.http.post<Local>(this.host + '/local/', c);
  }

  updateLocal(c: Local): Observable<Local>{
    return this.http.put<Local>(this.host + '/local/' + c.id, c);
  }
  getAll(): Observable<Local[]> {
    return this.http.get<any[]>(this.host + '/local/all');
  }
}

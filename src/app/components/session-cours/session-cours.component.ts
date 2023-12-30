import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SessionCoursService} from '../../services/session-cours.service';
import {SessionCours} from '../../entities/sessionCours.entities';
@Component({
  selector: 'app-session-cours',
  templateUrl: './session-cours.component.html',
  styleUrl: './session-cours.component.css'
})
export class SessionCoursComponent implements OnInit{
  Sessionscours?: SessionCours[]; //le ? signifie que la valeur undefinied est acceptée
  constructor(private sessionCoursService: SessionCoursService, private router:Router) { }
  ngOnInit(): void { }
  onSearch(value: any) {
    this.sessionCoursService.getSessionsCoursCours(value.id).subscribe(
      {
        next: data => {this.Sessionscours = data},
      });
  }
  onNewSessionCours() {
    this.router.navigateByUrl('newSessionCours');
  }
  onDelete(sc: SessionCours) {
    let v = confirm('êtes vous sûr de vouloir supprimer ? ');
    if (v) {
      this.sessionCoursService.deleteSessionCours(sc).subscribe(
        {
          next: data => {
            this.onSearch(sc.cours); //rafraîchissement de la page actuelle
          },
          error: err => { alert(err.headers.get("error")); }
        }
      );
    }
  }
  onEdit(sc: SessionCours) {
    this.router.navigateByUrl('editSessionCours/'+sc.id);
  }
}

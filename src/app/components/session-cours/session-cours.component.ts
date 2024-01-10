import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SessionCoursService} from '../../services/session-cours.service';
import {SessionCours} from '../../entities/sessionCours.entities';
import {CoursService} from "../../services/cours.service";
import {Cours} from "../../entities/cours.entities";
@Component({
  selector: 'app-session-cours',
  templateUrl: './session-cours.component.html',
  styleUrl: './session-cours.component.css'
})
export class SessionCoursComponent implements OnInit{
  coursList: Cours[]=[];
  cours?: Cours[];
  selectedDate: string='';
  totalInscrits: number=0;
  sessions?: SessionCours[];
  Sessionscours?: SessionCours[]; //le ? signifie que la valeur undefinied est acceptée
  constructor(private coursService:CoursService,private sessionCoursService: SessionCoursService, private router:Router) { }
  ngOnInit(): void { }
  onSearch(value: any) {
    this.totalInscrits = 0;
    this.coursService.getCoursMatiere(value.matiere).subscribe(
      {
        next: data => {
          this.cours = data;
          data.forEach(cours => {
            this.sessionCoursService.getSessionsCoursCours(cours.id).subscribe(
              data => {
                this.Sessionscours = data;
                data.forEach(session => {
                  this.totalInscrits += session.nbreInscrits;
                })
              });
          })
        }
      });
  }

  onNewSessionCours() {
    this.router.navigateByUrl('newSessionCours');
  }
  onDateSelected(): void {
    this.sessions = [];
    this.coursList = [];
    this.sessionCoursService.getSessionCoursDate(this.selectedDate).subscribe(
      data => {
        this.sessions = data;
        data.forEach(session => {
          this.coursService.getCours(session.cours.id).subscribe(
            data => {
              const existingCours = this.coursList.find(cours => cours.id === data.id);
              if (!existingCours) {
                this.coursList.push(data);
              }
            },
            error => {
              console.error('Erreur lors de la récupération des cours', error);
            }
          );
        });
      },
      error => {
        console.error('Erreur lors de la récupération des sessions', error);
      }
    );
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

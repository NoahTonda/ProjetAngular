import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CoursService} from '../../services/cours.service';
import {Observable} from 'rxjs';
import {Cours} from '../../entities/cours.entities';
@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.css'
})
export class CoursComponent implements OnInit{
  cours?: Cours[]; //le ? signifie que la valeur undefinied est acceptée
  constructor(private coursService: CoursService, private router:Router) { }
  ngOnInit(): void { }
  onSearch(value: any) {
    this.coursService.getCoursMatiere(value.matiere).subscribe(
      {
        next: data => {this.cours = data},
      });
  }
  onNewCours() {
    this.router.navigateByUrl('newCours');
  }
  onDelete(c: Cours) {
    let v = confirm('êtes vous sûr de vouloir supprimer ? ');
    if (v) {
      this.coursService.deleteCours(c).subscribe(
        {
          next: data => {
            this.onSearch(c); //rafraîchissement de la page actuelle
            //la solution ci-dessous permet de ne pas recharger la liste à partir du backend
            /* const index = this.cours?.indexOf(c, 0); //élement à
           rechercher, position de départ de la recherche
            alert("index = "+index);
            if (!(index === undefined) && index > -1) {
            this.cours?.splice(index, 1);//position de l'élément à
           ôter,nombre d'éléments à ôter
            }*/
          },
          error: err => { alert(err.headers.get("error")); }
        }
      );
    }
  }
  onEdit(c: Cours) {
    this.router.navigateByUrl('editCours/'+c.id);
  }
}

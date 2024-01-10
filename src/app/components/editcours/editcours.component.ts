import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoursService} from '../../services/cours.service';
import {ActivatedRoute} from '@angular/router';
import {SessionCours} from "../../entities/sessionCours.entities";
import {SessionCoursService} from "../../services/session-cours.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-editcours',
  templateUrl: './editcours.component.html',
  styleUrl: './editcours.component.css'
})
export class EditcoursComponent implements OnInit{
  coursFormGroup?: FormGroup;
  submitted = false;
  idCours: number;
  sessionsCours?:SessionCours[]
  constructor(private router:Router,private coursService: CoursService,private fb: FormBuilder,private sessionCoursService:SessionCoursService,activatedRoute : ActivatedRoute) {
    this.idCours=activatedRoute.snapshot.params.idcours;
  }
  ngOnInit(): void {
    this.coursService.getCours(this.idCours).subscribe(
      cours =>{this.coursFormGroup = this.fb.group({
        id: [cours.id!, Validators.required],
        matiere: [cours.matiere, Validators.required],
        nbreHeures: [cours.nbreHeures, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      })
      });
  }
  onUpdateCours(): void {
    this.submitted = true;
    if (this.coursFormGroup?.invalid) { return; }

    this.coursService.updateCours(this.coursFormGroup?.value).subscribe(
      data => {alert('maj ok');
        this.router.navigate(['cours'])
      },
      err => {
        alert(err.headers.get("error"));
      });
  }
  onSeeSessionsCours() {

    this.sessionCoursService.getSessionsCoursCours(this.idCours).subscribe(
      data =>
      {this.sessionsCours=data;
      },
      err => {
        alert(err.headers.get("error"));
      });
  }
  onDelete(sc: SessionCours) {
    let v = confirm('êtes vous sûr de vouloir supprimer ? ');
    if (v) {
      this.sessionCoursService.deleteSessionCours(sc).subscribe(
        {
          next: data => {
            this.onSeeSessionsCours(); //rafraîchissement de la page actuelle
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

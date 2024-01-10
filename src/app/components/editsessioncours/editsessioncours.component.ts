import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {SessionCours} from "../../entities/sessionCours.entities";
import {SessionCoursService} from "../../services/session-cours.service";
import {FormateurService} from "../../services/formateur.service";
import {LocalService} from "../../services/local.service";
import {CoursService} from "../../services/cours.service";
import {Cours} from "../../entities/cours.entities";
import {Formateur} from "../../entities/formateur.entities";
import {Local} from "../../entities/local.entities";
import {formatDate} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-editsessioncours',
  templateUrl: './editsessioncours.component.html',
  styleUrl: './editsessioncours.component.css'
})
export class EditsessioncoursComponent implements OnInit{
  sessionCoursFormGroup?: FormGroup;
  coursList: Cours[]=[];
  formateurList: Formateur[]=[];
  localList: Local[]=[];

  @Input() sessionCours?: SessionCours;
  submitted = false;
  idSession: number;
  constructor(private router:Router,private sessionCoursService: SessionCoursService,private formateurService: FormateurService, private localService: LocalService, private coursService: CoursService,private fb: FormBuilder,activatedRoute : ActivatedRoute) {
    this.idSession=activatedRoute.snapshot.params.idSessionCours;
  }
  ngOnInit(): void {
    this.sessionCoursService.getSessionCours(this.idSession).subscribe(
      sessionCours =>{this.sessionCoursFormGroup = this.fb.group({
        id: [sessionCours.id, Validators.required],
        dateDebut: [formatDate(sessionCours.dateDebut, 'yyyy-MM-dd', 'en'), [Validators.required]],
        dateFin: [formatDate(sessionCours.dateFin, 'yyyy-MM-dd', 'en'), [Validators.required]],
        nbreInscrits: [sessionCours.nbreInscrits, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
        formateur: [sessionCours.formateur.id, Validators.required],
        local: [sessionCours.local.id, Validators.required],
        cours: [sessionCours.cours.id, Validators.required],
      });
      });
    // Chargez la liste des cours, formateurs et locaux depuis la base de données
    this.loadCours();
    this.loadFormateurs();
    this.loadLocaux();
  }
  loadCours(): void {
    this.coursService.getAll().subscribe(
      (data) => {
        this.coursList = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des cours', error);
      }
    );
  }

  loadFormateurs(): void {
    this.formateurService.getAll().subscribe(
      (data) => {
        this.formateurList = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des formateurs', error);
      }
    );
  }

  loadLocaux(): void {
    this.localService.getAll().subscribe(
      (data) => {
        this.localList = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des locaux', error);
      }
    );
  }
  onUpdateSessionCours(): void {
    this.submitted = true;
    if (this.sessionCoursFormGroup?.invalid) {
      return;
    }
    this.sessionCoursService.updateSessionCours(this.sessionCoursFormGroup?.value).subscribe({
        next: data => {
          alert('maj ok');
          this.router.navigate(['sessionCours']);
        },
        error : err => alert(err.headers.get("error"))
      })
    }

}

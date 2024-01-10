import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SessionCours} from "../../entities/sessionCours.entities";
import {SessionCoursService} from '../../services/session-cours.service';
import {Cours} from "../../entities/cours.entities";
import {CoursService} from "../../services/cours.service";
import {Formateur} from "../../entities/formateur.entities";
import {FormateurService} from "../../services/formateur.service";
import {formatDate} from '@angular/common';
import {LocalService} from "../../services/local.service";
import {Local} from "../../entities/local.entities";
import {Router} from "@angular/router";

@Component({
  selector: 'app-newsessioncours',
  templateUrl: './newsessioncours.component.html',
  styleUrl: './newsessioncours.component.css'
})
export class NewsessioncoursComponent implements OnInit{
  coursList: Cours[]=[];
  formateurList: Formateur[]=[];
  localList: Local[]=[];
  @Input() coursact? : FormGroup;
  @Input() locact? : FormGroup;
  @Input() formact? : FormGroup;
  @Output() newSessionCours = new EventEmitter<SessionCours>();
  sessionCoursFormGroup?: FormGroup;
  submitted = false;
  sc?:SessionCours;
  constructor(private router:Router,private fb: FormBuilder, private sessionCoursService: SessionCoursService, private coursService: CoursService, private formateurService: FormateurService, private localService: LocalService) { }
  ngOnInit(): void {
    this.sessionCoursFormGroup = this.fb.group({
      dateDebut: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
      dateFin: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
      nbreInscrits: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      formateur: ['', Validators.required],
      local: ['', Validators.required],
      cours: ['', Validators.required],
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
  onSaveSessionCours(): void {
    this.submitted = true;
    if (this.sessionCoursFormGroup?.invalid) {
      return;
    }
    this.sessionCoursService.save(this.sessionCoursFormGroup?.value).subscribe(
      data => {
        alert('sauvegarde ok');
        this.sc = data;
        this.router.navigate(['sessionCours']);
        },
      err => {
        alert(err.headers.get("error"));
      });
  }
}

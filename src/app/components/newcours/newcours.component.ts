import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoursService} from '../../services/cours.service';
@Component({
  selector: 'app-newcours',
  templateUrl: './newcours.component.html',
  styleUrls: ['./newcours.component.css']
})
export class NewcoursComponent implements OnInit {
  coursFormGroup?: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private coursService:
    CoursService) {
  }
  ngOnInit(): void {
    this.coursFormGroup = this.fb.group({
      matiere: ['', Validators.required],  // Champ matiere est requis
      nbreHeures: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],  // Champ nbreheure est requis et doit être un nombre positif
    });
  }
  onSaveCours() {
    this.submitted = true;
    if (this.coursFormGroup?.invalid) { return; }
    this.coursService.save(this.coursFormGroup?.value).subscribe(data => {alert('sauvegarde ok')},
      err => {
        alert(err.headers.get("error"));
      });
  }
}

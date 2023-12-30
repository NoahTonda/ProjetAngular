import { Cours } from './cours.entities';
import {Formateur} from "./formateur.entities";
import {Local} from "./local.entities";
export interface SessionCours {
  id : number;
  dateDebut: Date;
  dateFin: Date;
  nbreInscrits: number;
  cours: Cours;
  formateur: Formateur;
  local: Local;
}

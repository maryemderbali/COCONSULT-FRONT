import { Projects } from "./projects";

export class Quote {
  idQuote!: number;
  montant!: number;
  nom!:string;
  creationDate!: Date;
  expireDate!: Date;
  description!: string;
  projects?: Projects; // Assuming Projets is another entity
  valid: boolean = false;



}

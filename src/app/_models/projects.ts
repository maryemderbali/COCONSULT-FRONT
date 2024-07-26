import { Assignements } from "./assignements";
import { Expanses } from "./expanses";

export class Projects {
  idProjet!: number;
  projetTitle!: string;
  budget: number=0;
  mail!: string;
  dateDebut!: Date;
  dateFin!: Date;
  effectif: number=0;
  description!: string;
  isvalid!: boolean;
  expanses?: Expanses[];
  assignement?: Assignements[];

  }

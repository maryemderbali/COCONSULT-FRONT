import { Projects } from "./projects";

export class Expanses {
  idExps!: number;
  category!: string;
  montant!: number;
  date!: Date;
  description!: string;
  projects?: Projects;
}

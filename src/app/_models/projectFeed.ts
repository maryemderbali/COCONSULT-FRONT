import { Projects } from "./projects";

export class ProjFeed {
  idPjtFeed!: number;
  content!: string;
  timeUpd!: Date;
  fctsUpd!: Date;
  project?: Projects = new Projects();
}

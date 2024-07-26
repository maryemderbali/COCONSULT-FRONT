import { Projects } from "./projects";

export class TimeRecord {
  idTimeRec: number;
  budget: number;
  date: Date;
  duration: Date;
  description: string;
  projects?: Projects;
}

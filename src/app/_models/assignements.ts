import { Projects } from "./projects";

export class Assignements {
    idAssign!: number;
    timeRecording!: Date; // Assuming ISO format for dates (e.g., 'YYYY-MM-DD')
    expenses!: number;
    projects?: Projects; // Assuming Projets is another entity
  }

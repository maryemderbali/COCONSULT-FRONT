import { Projets } from "./project";

export class Activity {
    idActivity!: number;
    nbreOfTask!: number;
    activityContent!: number;
    taskType!: ActivityType;
    projet!: Projets; // Mettez à jour pour inclure les détails du projet associé
  }

export enum ActivityType{
    Security = 'Security',
    DevpWeb = 'DevpWeb',
    devMobile = 'devMobile',
    Gamix = 'Gamix',
    BAnking = 'BAnking',
    AIorBI = 'AIorBI',
    Emprque = 'Emprque',
    Datasc = 'Datasc',
    CloudComp = 'CloudComp',
}
import { Question } from "./question";

  
export class Quiz{   
id_quiz!:number;
titre?:string;

numberOfQuestions?:string;
 
id_jobopport?: number; 
questions?: Question[];
}
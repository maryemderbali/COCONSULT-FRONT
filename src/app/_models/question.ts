import { Quiz } from "./quiz";

export class Question{
  
    idQuest!:number;
    ponderation?:number;
    type?:string;
    content?:string;
   option1!:string;
   option2!:string;
   option3!:string;
   option4!:string;
   answer?:string;
   selected_answer!:string;
quiz:Quiz;
id_quiz:number

}
   
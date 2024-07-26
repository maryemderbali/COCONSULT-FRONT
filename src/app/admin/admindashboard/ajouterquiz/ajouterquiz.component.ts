import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { JobOpport } from 'src/app/_models/jobopport';
import { Quiz } from 'src/app/_models/quiz';
import { JobopportService } from 'src/app/_services/jobopport.service';
import { QuizService } from 'src/app/_services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouterquiz',
  templateUrl: './ajouterquiz.component.html',
  styleUrls: ['./ajouterquiz.component.css']
})
export class AjouterquizComponent {
  quiz: Quiz = new Quiz();
  jobOpportunities: JobOpport[] = [];

  constructor(private quizService: QuizService, private jobOpportService: JobopportService,private dialogRef: MatDialogRef<AjouterquizComponent>) {}

  ngOnInit(): void {
 
  }

 

  ajouterQuiz() {
    this.quizService. ajouterquiz(this.quiz)
      .subscribe(
        response => {
          console.log('Réponse du serveur:', response);
          Swal.fire('QUIZ Aded ');
          this.dialogRef.close();
        },
        error => {
          console.error('Erreur lors de l\'ajout du quiz:', error);
          // Traitez l'erreur ici si nécessaire
        }
      );
  }
}



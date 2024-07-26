import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/_models/question';
import { Quiz } from 'src/app/_models/quiz';
import { QuestionService } from 'src/app/_services/question.service';
import { QuizService } from 'src/app/_services/quiz.service';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() id_quiz: number | undefined;
  newQuestion: Question = new Question();
  quizzes: Quiz[] = [];
  selectedQuiz: Quiz | undefined;

  constructor(private questionService: QuestionService, private quizService: QuizService,public dialogRef: MatDialogRef<QuestionComponent>) {}

  ngOnInit() {
    // Charger la liste des quizzes au démarrage du composant
    this.loadQuizzes();
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  loadQuizzes() {
    
    this.quizService.getAllQuizzes().subscribe(
      (quizzes: Quiz[]) => {
        this.quizzes = quizzes;
      },
      (error) => {
        console.error('Erreur lors du chargement des quizzes :', error);
      }
    );
  }

  ajouterQuestionEtAffecterAuQuiz(): void {
    if (!this.selectedQuiz) {
      console.error('Veuillez sélectionner un quiz.');
      return;
    }

    this.newQuestion.quiz = this.selectedQuiz;

    this.questionService.ajouterQuestionEtReponseEtAffecterQuestionQuiz(this.newQuestion, this.selectedQuiz.id_quiz!)
      .subscribe(
        (response) => {
          console.log('Question ajoutée et affectée avec succès :', response);
          // Réinitialiser le formulaire ou effectuer d'autres actions nécessaires après l'ajout et l'affectation
          this.newQuestion = new Question();
          Swal.fire('Question Aded ');
          this.dialogRef.close();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout et l\'affectation de la question :', error);
        }
      );
  }}


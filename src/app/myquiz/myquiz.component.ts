import { Component } from '@angular/core';
import { QuizService } from '../_services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatService } from '../_services/candidat.service';
import { MatDialog } from '@angular/material/dialog';
import { Quiz } from '../_models/quiz';
import Swal from 'sweetalert2'; // Importez SweetAlert2
@Component({
  selector: 'app-myquiz',
  templateUrl: './myquiz.component.html',
  styleUrls: ['./myquiz.component.css']
})
export class MyquizComponent {
  quizzes: Quiz[]=[];
  quizInProgress = false;
  email: string;
  constructor(private route:ActivatedRoute,private quizService: QuizService, private router: Router,private candidatservice:CandidatService) {}
 
 

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.email = params['email'];
      // Stocker l'e-mail dans la session s'il est disponible dans l'URL
      if (this.email) {
        sessionStorage.setItem('email', this.email);
      }
    });
    this.loadQuiz();
  }

  loadQuiz(): void {
    this.quizService.getRandomQuiz()
      .subscribe(
        (quiz: Quiz) => {
          this.quizzes.push(quiz); // Utilisez push pour ajouter le quiz au tableau de quizzes
          console.log('Random quiz loaded:', quiz);
        },
        (error) => {
          console.error('Erreur lors du chargement du quiz aléatoire :', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Une erreur est survenue lors du chargement du quiz aléatoire. Veuillez réessayer plus tard.',
          });
        }
      );
  }
  viewQuestions(quizId: number): void {
    if (this.quizInProgress) {
      // Afficher une alerte si un quiz est déjà en cours
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'connecter vous svp!',
      });
    } else {
      // Vérifier si le candidat a déjà passé le test
      this.candidatservice.verifierPassageTest(this.email).subscribe(
        (result: boolean) => {
          if (!result) {
      this.quizInProgress = true;
    this.quizService.getQuestionsForQuiz(quizId)
      .subscribe(
        (questions) => {
          console.log("mes question sont",questions);
         this.router.navigate(['Affichagequestion', quizId,this.email]);
          
        },
        (error) => {
          console.error('Erreur lors du chargement des questions du quiz :', error);
        }
      );
    } else {
      // Si le candidat a déjà passé le test, afficher un message d'erreur
      Swal.fire('Error', 'Vous avez déjà passé le test', 'error');
    }
  },
  (error) => {
    console.error('Erreur lors de la vérification du passage du test:', error);
  }
);
}
}
}
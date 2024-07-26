import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Quiz } from 'src/app/_models/quiz';
import { QuizService } from 'src/app/_services/quiz.service';
import { UpdatequizComponent } from '../updatequiz/updatequiz.component';
import { AjouterquizComponent } from '../ajouterquiz/ajouterquiz.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  quizzes: Quiz[] = [];
  displayedColumns: string[] = [ 'titre', 'dateQuiz','numberOfQuestions', 'actions'];

  constructor(private quizService: QuizService,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchQuizzes();
 
  }

  fetchQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe(
      (quizzes: Quiz[]) => {
        this.quizzes = quizzes;
      },
      (error) => {
        console.error('Error fetching quizzes:', error);
      }
    );
  }

  openUpdateDialog(quiz: Quiz): void {
    const dialogRef = this.dialog.open(UpdatequizComponent, {
      width: '300px',
      data: { quiz }
    });

    dialogRef.afterClosed().subscribe(updatedQuiz => {
      if (updatedQuiz) {
        this.updateQuiz(quiz.id_quiz, updatedQuiz); // Call updateQuiz method when dialog closes
      }
    });
  }

  updateQuiz(id: number, updatedQuiz: Quiz): void {
    this.quizService.updateQuiz(id, updatedQuiz).subscribe(
      (response) => {
        // Handle success, if needed
        console.log('Quiz updated successfully:', response);
      },
      (error) => {
        // Handle error, if needed
        console.error('Error updating quiz:', error);
      }
    );
  }
  openDeleteConfirmation(quiz: Quiz): void {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.deleteQuiz(quiz.id_quiz);
    }
  }

  deleteQuiz(id: number): void {
    this.quizService.deleteQuiz(id).subscribe(
      () => {
        // Quiz deleted successfully
        // Refresh the quiz list or remove the deleted quiz from the list
        this.fetchQuizzes();
      },
      (error) => {
        console.error('Error deleting quiz:', error);
      }
    );
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AjouterquizComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(() => {
      // Rafraîchissez la liste des questions après la fermeture de la popup
      this.fetchQuizzes();
    });
  }}
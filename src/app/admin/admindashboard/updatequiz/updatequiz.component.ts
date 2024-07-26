import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Quiz } from 'src/app/_models/quiz';
import { QuizService } from 'src/app/_services/quiz.service';

@Component({
  selector: 'app-updatequiz',
  templateUrl: './updatequiz.component.html',
  styleUrls: ['./updatequiz.component.css']
})
export class UpdatequizComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdatequizComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { quiz: Quiz },
    private quizService: QuizService
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(quizForm: NgForm): void {
    // Appeler le service pour mettre à jour le quiz
    this.quizService.updateQuiz(this.data.quiz.id_quiz, this.data.quiz).subscribe(
      (updatedQuiz: Quiz) => {
        console.log('Quiz updated successfully:', updatedQuiz);
        this.dialogRef.close(updatedQuiz);
      },
      (error) => {
        console.log('Error updating quiz:', error);
      }
    );
  }
}
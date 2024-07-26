import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Question } from 'src/app/_models/question';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-updatequestion',
  templateUrl: './updatequestion.component.html',
  styleUrls: ['./updatequestion.component.css']
})
export class UpdatequestionComponent {
  constructor(
  public dialogRef: MatDialogRef<UpdatequestionComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { question: Question },
  private questionService: QuestionService
) {}

closeDialog(): void {
  this.dialogRef.close();
}

onSubmit(questionForm: NgForm): void {
  // Appeler le service pour mettre à jour la question
  this.questionService.updateQuestion(this.data.question.idQuest, this.data.question).subscribe(
    (updatedQuestion: Question) => {
      console.log('Question updated successfully:', updatedQuestion);
      this.dialogRef.close(updatedQuestion);
    },
    (error) => {
      console.log('Error updating question:', error);
    }
  );
}
}
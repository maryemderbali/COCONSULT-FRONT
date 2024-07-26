import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-quiz-rules-dialog',
  templateUrl: './quiz-rules-dialog.component.html',
  styleUrls: ['./quiz-rules-dialog.component.css']
})
export class QuizRulesDialogComponent {

 
 constructor(public dialog: MatDialog ){}

  closeDialog(): void {
    this.dialog.closeAll();
  }
}

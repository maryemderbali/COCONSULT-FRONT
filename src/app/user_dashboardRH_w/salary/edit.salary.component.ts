// edit-salary-modal.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalaryService } from './salary.service';

@Component({
  selector: 'app-edit-salary-modal',
  templateUrl: './modal.salary.html'
})
export class EditSalaryModalComponent {
  editedSalary: any;

  constructor(
    public salaryService: SalaryService,
    public dialogRef: MatDialogRef<EditSalaryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { salary: any }
  ) {
    this.editedSalary = { ...data.salary };
  }

  saveChanges(): void {
    this.salaryService.editSalary(this.editedSalary).subscribe(
      () => {
        console.log('Salary edited successfully');
        this.dialogRef.close(this.editedSalary); // Pass the edited salary data back to the parent component
      },
      error => {
        console.error('Error editing salary:', error);
      }
    );
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}

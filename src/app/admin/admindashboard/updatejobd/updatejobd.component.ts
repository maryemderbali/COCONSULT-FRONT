import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobOpport } from 'src/app/_models/jobopport';
import { JobopportService } from 'src/app/_services/jobopport.service';

@Component({
  selector: 'app-updatejobd',
  templateUrl: './updatejobd.component.html',
  styleUrls: ['./updatejobd.component.css']
})
export class UpdatejobdComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdatejobdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jobs: JobOpport },
    private jobopportService: JobopportService
  ) {}
  
  closeDialog(): void {
    this.dialogRef.close();
  }
  
  onSubmit(jobForm: NgForm): void {
    // Appeler le service pour mettre à jour la question
    this.jobopportService.updateJob(this.data.jobs.id_offre, this.data.jobs).subscribe(
      (updatedJob: JobOpport) => {
        console.log('Question updated successfully:', updatedJob);
        this.dialogRef.close(updatedJob);
      },
      (error) => {
        console.log('Error updating question:', error);
      }
    );
  }
  }



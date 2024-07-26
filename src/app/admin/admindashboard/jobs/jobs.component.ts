import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobOpport } from 'src/app/_models/jobopport';
import { JobopportService } from 'src/app/_services/jobopport.service';

import { UpdatejobdComponent } from '../updatejobd/updatejobd.component';
import { AddjobsComponent } from '../addjobs/addjobs.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent {
  jobs: JobOpport[] = [];

   
  constructor(private jobopportService: JobopportService,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.jobopportService.getAllJobOpports().subscribe(
      (jobs: JobOpport[]) => {
        this.jobs = jobs;
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }
  ouvrirPopupAjoutQuestion(): void {
    const dialogRef = this.dialog.open(AddjobsComponent
      , {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(() => {
      // Rafraîchissez la liste des questions après la fermeture de la popup
      this.fetchJobs();
    });
  }
  openUpdateDialog(jobs: JobOpport): void {
    const dialogRef = this.dialog.open(UpdatejobdComponent, {
      width: '300px',
      data: { jobs }
    });

    dialogRef.afterClosed().subscribe(updatedJob => {
      if (updatedJob) {
        this.updateJobs(jobs.id_offre, updatedJob); // Call updateQuiz method when dialog closes
      }
    });
  }

  updateJobs(id: number, updatedJob: JobOpport): void {
    this.jobopportService.updateJob(id, updatedJob).subscribe(
      (response) => {
        // Handle success, if needed
        console.log('job updated successfully:', response);
      },
      (error) => {
        // Handle error, if needed
        console.error('Error updating job:', error);
      }
    );
  }
  openDeleteConfirmation(jobs: JobOpport): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.deleteJob(jobs.id_offre);
    }
  }

  deleteJob(id: number): void {
    this.jobopportService.deleteJob(id).subscribe(
      () => {
        // Quiz deleted successfully
        // Refresh the quiz list or remove the deleted quiz from the list
        this.fetchJobs ();
      },
      (error) => {
        console.error('Error deleting job:', error);
      }
    );
  }
}





import { Component, OnInit } from '@angular/core';
import { JobOpport } from '../_models/jobopport';
import { JobopportService } from '../_services/jobopport.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-job-opport',
  templateUrl: './job-opport.component.html',
  styleUrls: ['./job-opport.component.css']
})
export class JobOpportComponent implements OnInit {
  jobOpports$: Observable<JobOpport[]>;
  

  constructor(private jobOpportService: JobopportService,private router:Router,private dialogRef: MatDialogRef<JobOpportComponent>)  { }
  ngOnInit(): void {
    this.jobOpports$ = this.getAllJobOpports();
  }

  getAllJobOpports(): Observable<JobOpport[]> {
    return this.jobOpportService.getAllJobOpports();
  }
  postuler(id: number): void {
    // Stocker l'ID de l'opportunité d'emploi dans la session
    sessionStorage.setItem('jobOpportId', id.toString());
    // Rediriger vers la page de candidature
    this.router.navigateByUrl('/candidature');
    this.dialogRef.close();
  }
}


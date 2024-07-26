import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { JobOpport } from 'src/app/_models/jobopport';
import { JobopportService } from 'src/app/_services/jobopport.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addjobs',
  templateUrl: './addjobs.component.html',
  styleUrls: ['./addjobs.component.css']
})
export class AddjobsComponent {

  jobOpportunities: JobOpport= new JobOpport();

  constructor( private jobOpportService: JobopportService,private dialogRef: MatDialogRef<AddjobsComponent>) {}

  ngOnInit(): void {
 
  }

 

  ajouterJob() {
    this.jobOpportService. createJobOpport(this.jobOpportunities)
      .subscribe(
        response => {
          console.log('Réponse du serveur:', response);
          Swal.fire('QUIZ Aded ');
          this.dialogRef.close();
        },
        error => {
          console.error('Erreur lors de l\'ajout du jobOpportunities:', error);
          // Traitez l'erreur ici si nécessaire
        }
      );
  }
}






import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReclamationDTO } from 'src/app/_models/ReclamationDTO';
import { Candidat } from 'src/app/_models/candidat';
import { CandidatDetailsDTO } from 'src/app/_models/candidatDetail';
import { Reclamation } from 'src/app/_models/reclamation';
import { CandidatService } from 'src/app/_services/candidat.service';
import { ReclamationService } from 'src/app/_services/reclamation.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-candidatresult',
  templateUrl: './candidatresult.component.html',
  styleUrls: ['./candidatresult.component.css']
})
export class CandidatresultComponent {
  candidatDetails: CandidatDetailsDTO[];
  reclamations: ReclamationDTO[];
  candidats: Candidat[];
 

  constructor(private candidatService: CandidatService,private reclamationService:ReclamationService,private http: HttpClient) { }

  ngOnInit(): void {
    this.getCandidatDetails();
    
    this.loadReclamations();

  }

  getCandidatDetails(): void {
    this.candidatService.getCandidatDetails()
      .subscribe(data => {
        this.candidatDetails = data;
      }, error => {
        console.error('Error fetching candidat details:', error);
      });
  }

  loadReclamations(): void {
    this.reclamationService.getAllReclamationsWithCandidatNames().subscribe(
      reclamations => {
        this.reclamations = reclamations;
       
      },
      error => {
        console.error('Error fetching reclamations:', error);
      }
    );
  }
  deleteReclamation(id: number): void {
    this.reclamationService.deleteReclamationById(id).subscribe(
      () => {
        console.log('Réclamation supprimée avec succès');
  
      },
      (error) => {
        console.error('Erreur lors de la suppression de la réclamation', error);
        this.loadReclamations()
      }
    );
  }
  deleteCandidatDetails(candidatId: number): void {
    this.http.delete<any>(`http://localhost:8082/candidat/candidat-details/${candidatId}`)
      .subscribe(
        () => {
          console.log('Candidat details deleted successfully');
        },
        error => {
          console.error('Error deleting candidat details:', error);
          Swal.fire("done","thank you");
          this.getCandidatDetails();
        }
      );
  } 
}

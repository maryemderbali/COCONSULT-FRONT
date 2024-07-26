import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DemandeService } from './demande.service';
import { saveAs } from 'file-saver';


@Component({
  templateUrl: './table.demande.component.html',
    styleUrls: ['./add-demande.component.css']

})
export class DemandeCongeComponent implements OnInit {
  displayedColumns: string[] = ['user', 'duration', 'startDate', 'type', 'certificate','actions'];
  demandes: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private demandeCongeService: DemandeService) { }

  ngOnInit() {
    this.fetchDemandes();
  }

  fetchDemandes() {
    this.demandeCongeService.getAllDemandes().subscribe( demandes => {
      this.demandes = new MatTableDataSource(demandes);
      this.demandes.paginator = this.paginator;
    });
  }

  downloadFile(demande: any) {
    const id = demande.id;
    const downloadUrl = `http://localhost:8082/api/demande-conge/demande-conge/${id}/certificate`;
    
    // Open a new blank window with the download URL
    window.open(downloadUrl, '_blank');
  }

  approveDemande(demande: any) {
    // Implement logic to approve the demand
    this.demandeCongeService.approveDemande(demande.id).subscribe(
        response => {
            console.log('Demande approved successfully:', response);
            this.fetchDemandes(); // Fetch the updated list of demands
        },
        error => {
            console.error('Error approving demand:', error);
        }
        );
  }
  
  declineDemande(demande: any) {
    // Implement logic to decline the demand
    this.demandeCongeService.deleteDemande(demande.id).subscribe(
        response => {
            console.log('Demande deleted successfully:', response);
            this.fetchDemandes(); // Fetch the updated list of demands
        },
        error => {
            console.error('Error deleting demand:', error);
        }
        );
  }
  

 
}

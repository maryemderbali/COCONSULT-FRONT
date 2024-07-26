import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CongeService } from './conge-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-conge-details-modal',
  templateUrl: './conge-details-modal.html',
  styleUrls: ['./conge-details.modal.css']
})
export class CongeDetailsModalComponent {
    conge: any;
  constructor(
    public dialogRef: MatDialogRef<CongeDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { conge: any },
    private congeService: CongeService,
    private router: Router
  ) {
    console.log('Data:', data);
    this.conge = data.conge;
  }

  editConge(): void {
    this.congeService.editConge(this.conge).subscribe(
      () => {
        console.log('Conge edited successfully');
        this.dialogRef.close(this.conge); // Pass the edited conge data back to the parent component
      },
      error => {
        console.error('Error editing conge:', error);
      }
    );
  }

  deleteConge(): void {
    if (this.conge && this.conge.idCong) {
      this.congeService.deleteConge(this.conge.idCong).subscribe(
        () => {
          console.log('Conge deleted successfully');
          this.dialogRef.close(); // Close the dialog after deletion
            this.router.navigate(['user_dashboard/Conge']);
        },
        error => {
          console.error('Error deleting conge:', error);
        }
      );
    }
  }
}

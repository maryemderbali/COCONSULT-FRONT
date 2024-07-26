import { Component } from '@angular/core';
import { CandidatService } from '../_services/candidat.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidat } from '../_models/candidat';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-candidatemail',
  templateUrl: './candidatemail.component.html',
  styleUrls: ['./candidatemail.component.css']
})
export class CandidatemailComponent {
  email: string;

  constructor(private candidatService: CandidatService, private router: Router) { }

  onSubmit(): void {
    this.candidatService.getCandidatByEmail(this.email).subscribe(
      (candidatId: number) => {
        if (candidatId) {
          // Stocker l'ID dans la session
          sessionStorage.setItem('id', candidatId.toString());
          // Afficher une alerte avec Swal
          Swal.fire('ARE YOU READY');
          // Rediriger vers la page de profil
          this.router.navigateByUrl('/profil');
        } else {
          console.error('L\'ID du candidat n\'est pas valide:', candidatId);
          // Gérer l'erreur
          Swal.fire('ERROR', 'Invalid ID found for this email', 'error');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'ID du candidat:', error);
        // Gérer l'erreur
        Swal.fire('ERROR', 'you cant ', 'error');
      }
    );
  }
}

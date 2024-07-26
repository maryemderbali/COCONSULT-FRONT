import { Component } from '@angular/core';
import { CandidatService } from '../_services/candidat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobOpport } from '../_models/jobopport';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Assurez-vous de mettre le chemin correct

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent {
  email: string;
  prenom:string;
  nom: string
  selectedFile: File;
  submittedEmails: string[] = []; 

  constructor(private candidatService: CandidatService, private router: Router) { }

  onSubmit(): void {
    if (!this.selectedFile || !this.email || !this.nom) {
      Swal.fire('Erreur', 'Veuillez sélectionner un fichier et saisir votre e-mail.', 'error');
      return;
    }
  
   
    if (this.submittedEmails.includes(this.email)) {
      Swal.fire('Erreur', 'Cet email a déjà été soumis.', 'error');
      return;
    }
  
    // Récupérer l'ID de l'opportunité d'emploi à partir de la session
    const jobOpportIdFromSession = sessionStorage.getItem('jobOpportId');
    console.log(jobOpportIdFromSession);
    if (!jobOpportIdFromSession) {
      Swal.fire('Erreur', 'Impossible de récupérer l\'ID de l\'opportunité d\'emploi à partir de la session.', 'error');
      return;
    }
  
    const jobOpportId = +jobOpportIdFromSession; // Convertir en nombre
  
    // Ajouter l'email à la liste des emails soumis
    this.submittedEmails.push(this.email);
    

  
    this.candidatService.uploadAndExtract(jobOpportId, this.selectedFile, this.email, this.nom, this.prenom)
      .subscribe(response => {
        Swal.fire('Réponse du réseau', response, 'success');
      
      }, response => {
        Swal.fire('Merci', 'Votre demande est en cours de vérification. Veuillez vérifier votre mail pour plus de détails.');
   
        this.router.navigate(['#']);
      });
  }
  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
  }
}

import { Component, ViewChild, OnInit } from '@angular/core';
import { Reclamation } from '../_models/reclamation';
import { ReclamationService } from '../_services/reclamation.service';
import { CandidatemailComponent } from '../candidatemail/candidatemail.component';
import Swal from 'sweetalert2';
declare var webkitSpeechRecognition: any; 
@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  contenuReclamation: string;
  mailcandidat: any = sessionStorage.getItem('email');
  recognizing = false;
  recognition: any;

  constructor(private reclamationService: ReclamationService) { }

  ngOnInit() {
    this.initSpeechRecognition();
  }

  initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'fr-FR'; // Langue française, à adapter si nécessaire
      this.recognition.onstart = () => {
        this.recognizing = true;
      };
      this.recognition.onresult = (event) => {
        this.contenuReclamation = event.results[0][0].transcript;
        this.recognizing = false;
      };
      this.recognition.onerror = (event) => {
        console.error('Erreur de reconnaissance vocale :', event.error);
        this.recognizing = false;
      };
    } else {
      console.error('La reconnaissance vocale n\'est pas supportée par votre navigateur.');
    }
  }

  startRecognition() {
    if (this.recognition) {
      this.recognition.start();
    } else {
      console.error('La reconnaissance vocale n\'est pas initialisée.');
    }
  }

  stopRecognition() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  soumettreReclamation(mailcandidat) {
    if (!mailcandidat) {
    
      Swal.fire("warning","you can't do a reclamation","warning");
    }

    this.reclamationService.ajouterReclamation(this.contenuReclamation, mailcandidat)
      .subscribe(
        () => {
          console.log('Réclamation soumise avec succès');
       
          this.contenuReclamation = '';

        },
        error => {
          console.error('Erreur lors de la soumission de la réclamation : ', error);
          Swal.fire("Réclamation soumise avec succès","thank you");
        }
      );
  }
}
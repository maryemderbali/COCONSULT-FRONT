import { Component, OnInit } from '@angular/core';
import { ChatGptService, Message } from '../_services/chat-gpt.service';
import { MatDialog } from '@angular/material/dialog';
import { JobOpportComponent } from '../job-opport/job-opport.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TESTComponent  {


chatMessages: { text: string, sender: string }[] = []; 
question: string;
answer: string;

constructor(private http: HttpClient , private dialog: MatDialog,private router: Router) {}


ngOnInit(): void {
  // Naviguer vers la route /test
  this.router.navigate(['/test']);
}

  askQuestion() {
    // Envoyer la question au serveur
    const data = { question: this.question };
    this.http.post<any>('http://localhost:5000/jobopportunities', data)
      .subscribe(response => {
        // Ajouter la question de l'utilisateur et la réponse du serveur aux messages de chat
        this.chatMessages.push({ text: this.question, sender: 'user' });
        this.chatMessages.push({ text: response.answer, sender: 'bot' });

        // Effacer la question après avoir reçu la réponse
        this.question = '';
      }, error => {
        console.error('Une erreur s\'est produite : ', error);
      });
  }














openJobOpportModal() {

this.dialog.open(JobOpportComponent, {
  width: '80%', // Définissez la largeur de la fenêtre modale selon vos besoins
  height: '80%', // Définissez la hauteur de la fenêtre modale selon vos besoins
});
}
chatVisible: boolean = false;

toggleChat(): void {
  this.chatVisible = !this.chatVisible;
}
}


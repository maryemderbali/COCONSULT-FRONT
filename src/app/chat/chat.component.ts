import { Component } from '@angular/core';
import { ChatGptService, Message } from '../_services/chat-gpt.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {



  question: string;
  answer: string;

  constructor(private http: HttpClient) {}

  askQuestion() {
    const data = { question: this.question };
    this.http.post<any>('http://localhost:5000/jobopportunities', data)
      .subscribe(response => {
        this.answer = response.answer;
      }, error => {
        console.error('Une erreur s\'est produite : ', error);
      });
  }
}
//   knowledgeBase: any;
//   newQuestion: string = '';
//   newAnswer: string = '';

//   userInput: string = '';
//   botResponse: string = '';
//   constructor(private knowledgeBaseService: ChatGptService) {}

//   ngOnInit() {
//     this.loadKnowledgeBase();
//   }

//   loadKnowledgeBase() {
//     this.knowledgeBaseService.loadKnowledgeBase().subscribe(data => {
//       this.knowledgeBase = data.questions;
//     });
//   }

//   addNewQnA() {
//     if (this.newQuestion && this.newAnswer) {
//       this.knowledgeBase.push({ question: this.newQuestion, answer: this.newAnswer });
//       this.knowledgeBaseService.updateKnowledgeBase({ questions: this.knowledgeBase }).subscribe(() => {
//         console.log('Knowledge base updated successfully.');
//       }, error => {
//         console.error('Error updating knowledge base:', error);
//       });
//       this.newQuestion = '';
//       this.newAnswer = '';
//     } else {
//       alert('Please enter both question and answer.');
//     }
//   }





//   sendMessage() {
//     if (this.userInput.trim() === '') return;

//     this.knowledgeBaseService.askQuestion(this.userInput).subscribe(response => {
//       this.botResponse = response.answer;
//     });
//     this.userInput = '';
//   }
// }

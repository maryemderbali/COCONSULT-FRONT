import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Quiz } from '../_models/quiz';

export class Message {
  constructor(public author: string, public content: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {

  constructor(private http: HttpClient) {}

   knowledgeBaseUrl= 'http://127.0.0.1:5000/knowledge-base'; // Changer l'URL en fonction de votre API Python
  // Charger la base de connaissances depuis l'API
  loadKnowledgeBase(): Observable<any> {
    return this.http.get<any>(this.knowledgeBaseUrl);
  }

  // Mettre à jour la base de connaissances via l'API
  updateKnowledgeBase(data: any): Observable<any> {
    return this.http.post<any>(this.knowledgeBaseUrl, data);
  }

  private apiUrl = 'http://localhost:5000/ask';


  askQuestion(question: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { question });
  }
}

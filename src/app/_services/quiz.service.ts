import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Question } from '../_models/question';
import { Quiz } from '../_models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  apiUrl = 'http://localhost:8082/quizzes/'; 
  apiUrl1=' http://localhost:8082/evaluatequiz/'
  constructor(private http: HttpClient) {
    
  }
  getRandomQuiz(): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}random`);
  }
  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiUrl + 'getallquizzes');
  }
  getQuizzesForJobOpport(jobIdOpport: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}jobopport/${jobIdOpport}/quiz`);
  }

  ajouterQuizAJobOpport(quiz: Quiz): Observable<any> {
    const url = `${this.apiUrl}jobopport/${quiz.id_jobopport}/quiz`;
    return this.http.post<any>(url, quiz, { headers: { 'Content-Type': 'application/json' } });
  }
  
 

    ajouterquiz(quiz: Quiz): Observable<Quiz> {
      return this.http.post<Quiz>(this.apiUrl + 'createquiz', quiz);
      
    
  }

  getQuizById(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(this.apiUrl + `getquizbyid/${id}`);
  }


 
  getQuestionsForQuiz(quizId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}questionsbyid/${quizId}`);
  }
  evaluateQuiz(question: any, option: string, mailcandidat: string): Observable<any> {
    
    return this.http.put<any>(`${this.apiUrl1}${question}/${option}/${mailcandidat}`,null);
  }
  updateQuiz(id: number, quiz: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.apiUrl}updatequiz/${id}`, quiz);
  }
  
  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}deletequiz/${id}`);
  }
  
}



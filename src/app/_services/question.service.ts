import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Question } from '../_models/question';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  apiUrl = 'http://localhost:8082/question/'; // Remplacez ceci par l'URL de votre API
  apiUrl1 = 'http://localhost:8082/quizzes/'; 

  constructor(private http: HttpClient) {
      
  }
  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}deletequestion/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  updateQuestion(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}updatequestion/${id}`, question)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
  ajouterQuestionEtReponseEtAffecterQuestionQuiz(question: Question, idQuiz: number): Observable<Question> {
    const url = `${this.apiUrl}affecterquaqui/${idQuiz}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Spécifier le type de contenu JSON
    });
    return this.http.post<Question>(url, question, { headers: headers });
  }
  

  ajouterquestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.apiUrl + 'createquestion', question);
}
getAllquestion(): Observable<Question[]> {
  return this.http.get<Question[]>(this.apiUrl + 'getallquestion');
}

getQuestionsForQuiz(quizId: number,mailcandidat:any): Observable<Question[]> {
  return this.http.get<Question[]>(`${this.apiUrl1}questions/${quizId}/${mailcandidat}`);
}



}
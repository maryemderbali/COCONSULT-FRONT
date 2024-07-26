// evaluation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private baseUrl = 'http://localhost:8082/api/evaluation';

  constructor(private http: HttpClient) {}

  addEvaluation(evaluationData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add-evaluation/`, evaluationData);
  }
}

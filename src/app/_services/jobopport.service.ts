import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { JobOpport } from '../_models/jobopport';

@Injectable({
  providedIn: 'root'
})
export class JobopportService {

 baseUrl = 'http://localhost:8082/jobopports'; // Update with your actual backend URL

  constructor(private http: HttpClient) { }


  getAllJobOpports(): Observable<JobOpport[]> {
    return this.http.get<JobOpport[]>(`${this.baseUrl}/getalljob`);
  }
  
  createJobOpport(jobOpport: JobOpport): Observable<JobOpport> {
    return this.http.post<JobOpport>(`${this.baseUrl}/add`, jobOpport)
      .pipe(
        catchError(this.handleError)
      );
  }

 

  getJobOpportById(id: number): Observable<JobOpport> {
    return this.http.get<JobOpport>(`${this.baseUrl}`);
  }

  updateJob(id: number, jobOpport: JobOpport): Observable<JobOpport> {
    return this.http.put<JobOpport>(`${this.baseUrl}/${id}`, jobOpport)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  
  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  
}




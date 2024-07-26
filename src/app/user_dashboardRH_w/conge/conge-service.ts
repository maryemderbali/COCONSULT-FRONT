import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })

  export class CongeService {
    private apiUrl = 'http://localhost:8082/api/conge/getCurrentConge';
    private baseUrl = 'http://localhost:8082/api/conge';
  
    constructor(private http: HttpClient) { }
  
    getCurrentConge(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }
    addConge(salaryData: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/add-conge`, salaryData);
      }

      deleteConge(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/delete-conge/${id}`);
      }
      editConge(conge: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/edit-conge`, conge);
      }
  }
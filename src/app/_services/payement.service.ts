import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayementService {

  private baseUrl = 'http://localhost:8082/Payment'; // Update with your Spring Boot API URL

  constructor(private http: HttpClient) { }

  uploadPaymentsData(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.baseUrl}/upload-payments-data`, formData);
  }

  getDailySales(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}/daily`);
  }
 
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private baseUrl = 'http://localhost:8082'; // Base URL of your Spring Boot backend

  constructor(private http: HttpClient) { }

  generatePdf(): Observable<Blob> { // Set the return type to Blob
    return this.http.get(`${this.baseUrl}/api/pdf/generatePdf`, { responseType: 'blob' });
  }

  // Add other methods as needed
}

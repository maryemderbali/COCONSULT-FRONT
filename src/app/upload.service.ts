import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl = 'http://localhost:8082'; // Mettez l'URL de votre API Spring Boot

  constructor(private http: HttpClient) { }

  getPdf(pdfName: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/pdfs/${pdfName}`, { responseType: 'blob' });
  }

  uploadFile(idContract: number, file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<string>(`${this.baseUrl}/upload`, formData, { headers });
  }
}
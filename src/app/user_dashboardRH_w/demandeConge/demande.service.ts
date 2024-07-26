import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class  DemandeService {
  private apiUrl = "http://localhost:8082/api"; 

  constructor(private http: HttpClient) { }

  addAsk(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/demande-conge/add-demande-conge`, formData);
  }

  getAllDemandes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/demande-conge/`);
  }

  deleteDemande(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/demande-conge/delete-demande-conge/${id}`);
  }

  approveDemande(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/demande-conge/approve-demande-conge/${id}`, {});
  }

  downloadFile(id: number): Observable<any> {
    // Define the endpoint URL to download the file
    const url = `${this.apiUrl}/demande-conge/demande-conge/${id}/certificate`;

    // Make a request to download the file
    return this.http.get(url, {
      responseType: 'blob' // Set the response type to 'blob' to handle binary data
    });
  }
}

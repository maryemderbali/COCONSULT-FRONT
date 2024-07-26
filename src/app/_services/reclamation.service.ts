import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Reclamation } from '../_models/reclamation';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ReclamationDTO } from '../_models/ReclamationDTO';
import { Candidat } from '../_models/candidat';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {


 apiUrl = 'http://localhost:8082'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  ajouterReclamation(contenu: string, emailCandidat: string): Observable<Reclamation> {
    const url = `${this.apiUrl}/${emailCandidat}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Reclamation>(url, contenu, { headers: headers });
  }
 // Remplacez cela par l'URL de votre API

 private apiUrl1 = 'http://localhost:8082'; // Assurez-vous de mettre la bonne URL de votre API

 getAllReclamationsWithCandidatNames(): Observable<ReclamationDTO[]> {
  return this.http.get<ReclamationDTO[]>(`${this.apiUrl1}/all`);
}
deleteReclamationById(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl1}/${id}`);
}
}



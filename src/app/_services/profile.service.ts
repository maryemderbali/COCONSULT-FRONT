import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Profil } from '../_models/profil';
import { Candidat } from '../_models/candidat';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }

  uploadPhoto(candidatId: number, file: File):Observable<any> {
    const formData = new FormData();
    formData.append('photo', file);

    return this.http.post<any>(`http://localhost:8082/candidat/candidats/${candidatId}/upload-photo`, formData);
  }
  getCandidatPhoto(candidatId: number): Observable<any> {
    const url = `http://localhost:8082/candidats/${candidatId}/photo`;
    return this.http.get(url, { responseType: 'blob' })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Une erreur s\'est produite :', error.error.message);
    } else {
      console.error(
        `Code d'erreur ${error.status}, ` +
        `Erreur : ${error.error}`);
    }
    return throwError('Une erreur est survenue. Veuillez réessayer plus tard.');
  }




  createCandidat(candidatId: number, info: string): Observable<string> {
    const formData = new FormData();
    formData.append('info', info);
    const headers = new HttpHeaders();
   
    return this.http.post<string>(`http://localhost:8082/candidat/createcandidat/${candidatId}`, formData, { headers });
  }


  createCompetence(candidatId: number, competence: string): Observable<string> {
    const formData = new FormData();
    formData.append('competence', competence);
    const headers = new HttpHeaders();
   
    return this.http.post<string>(`http://localhost:8082/candidat/createcompetence/${candidatId}`, formData, { headers });
  }

  private baseUrl = 'http://localhost:8082/candidat/getcandidatbyid'; // Remplacez l'URL par celle de votre backend



  getCandidatInfo(id: number): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/${id}`, { responseType: 'text' as 'json' });
  }
  getCandidatCompetence(id: number): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/${id}`, { responseType: 'text' as 'json' });
  }

  getCandidatById(id: number): Observable<Candidat> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Candidat>(url);
  }


  updateJob(id: number, competence: string): Observable<String> {
    return this.http.put<String>(`${this.baseUrl}/${id}`, competence)
      .pipe(
        catchError(this.handleError)
      );
  }

}
  




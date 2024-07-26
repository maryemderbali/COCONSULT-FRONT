import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repertoire } from '../_models/Repertoire';
import { Prospect } from '../_models/Prospect';


@Injectable({
  providedIn: 'root'
})
export class RepertoireService {
  private baseUrl = 'http://localhost:8082/Repertoire'; // Update with your Spring Boot API URL


  constructor(private http: HttpClient) { }

  GetAllRepertoire(): Observable<Repertoire[]> {
    return this.http.get<Repertoire[]>(`${this.baseUrl}/GetAllRepertoire`);
  }

  addRepertoire(repertoire: Repertoire): Observable<Repertoire> {
    return this.http.post<Repertoire>(`${this.baseUrl}/ajouterRepertoire`, repertoire);
  }

  GetRepertoireByID(idRepertoire: number): Observable<Repertoire> {
    return this.http.get<Repertoire>(`${this.baseUrl}/GetRepertoireByID/${idRepertoire}`);
  }



  updateRepertoire(updatedRepertoire: Repertoire): Observable<Repertoire> {
    const id = updatedRepertoire.idRepertoire; // Assuming idContract is the correct property name
    return this.http.put<Repertoire>(`${this.baseUrl}/updateRepertoire/${id}`, updatedRepertoire);
  }


  RemoveRepertoire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/RemoveRepertoire/${id}`);
  }


  createRepertoireFromProspect(prospect: Prospect): Observable<Repertoire> {
    return this.http.post<Repertoire>(`${this.baseUrl}/createRepertoireFromProspect`, prospect);
  }
}

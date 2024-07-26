import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Expanses} from '../_models/expanses';

@Injectable({
  providedIn: 'root'
})
export class ExpansesService {
  private baseUrl = 'http://localhost:8082/expanses'; // Remplacez cela par l'URL de votre API backend

  constructor(private http: HttpClient) { }

  getAllExpanses(): Observable<Expanses[]> {
    return this.http.get<Expanses[]>(`${this.baseUrl}/GetAllExpanses`);
  }

  getExpanse(id: number): Observable<Expanses> {
    return this.http.get<Expanses>(`${this.baseUrl}/GetExpanse/${id}`);
  }

  addExpanse(expanses: Expanses): Observable<Expanses> {
    return this.http.post<Expanses>(`${this.baseUrl}/ajouterExpanse`, expanses);
  }

  updateExpanse(id: number, expanses: Expanses): Observable<Expanses> {
    return this.http.put<Expanses>(`${this.baseUrl}/updateExpanse/${id}`, expanses);
  }

  deleteExpanse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteExpanse/${id}`);
  }

  getExpansesForProject(projectId: number): Observable<Expanses[]> {
    return this.http.get<Expanses[]>(`${this.baseUrl}/${projectId}/getExpansesForProject`);
  }

  getExpansesUpdatedAfterDate(projectId: number, date: string): Observable<Expanses[]> {
    return this.http.get<Expanses[]>(`${this.baseUrl}/${projectId}/getExpansesUpdatedAfterDate?date=${date}`);
  }

  getLastExpanses(projectId: number, limit: number): Observable<Expanses[]> {
    return this.http.get<Expanses[]>(`${this.baseUrl}/${projectId}/getLastExpanses?limit=${limit}`);
  }
}

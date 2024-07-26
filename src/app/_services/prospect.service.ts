import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prospect } from '../_models/Prospect';

@Injectable({
  providedIn: 'root'
})
export class ProspectService {
  private baseUrl = 'http://localhost:8082/Prospect'; // Update with your Spring Boot API URL

  constructor(private http: HttpClient) { }

  getAllProspects(): Observable<Prospect[]> {
    return this.http.get<Prospect[]>(`${this.baseUrl}/GetAllProspect`);
  }

  addProspect(prospect: Prospect): Observable<Prospect> {
    return this.http.post<Prospect>(`${this.baseUrl}/ajouterProspect`, prospect);
  }

  getProspectById(idProspect: number): Observable<Prospect> {
    return this.http.get<Prospect>(`${this.baseUrl}/GetProspectByID/${idProspect}`);
  }

  updateProspect(updatedProspect: Prospect): Observable<Prospect> {
    const id = updatedProspect.idProspect;
    return this.http.put<Prospect>(`${this.baseUrl}/updateProspect/${id}`, updatedProspect);
  }

  removeProspect(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/RemoveProspect/${id}`);
  }

  uploadProspectsData(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.baseUrl}/upload-prospects-data`, formData);
  }
}

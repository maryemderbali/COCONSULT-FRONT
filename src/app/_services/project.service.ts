import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projets } from '../_models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:8082/Projet';

  constructor(private http: HttpClient) { }

  getAllProjets(): Observable<Projets[]> {
    return this.http.get<Projets[]>(`${this.baseUrl}/getAllProjets`);
  }
}

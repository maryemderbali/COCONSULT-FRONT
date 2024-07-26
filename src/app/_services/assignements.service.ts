import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Assignements} from '../_models/assignements';
import {Projects} from '../_models/projects';


@Injectable({
  providedIn: 'root'
})
export class AssignementsService {
  private baseUrl = 'http://localhost:8082/assignements';

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Projects[]> {
    return this.http.get<Projects[]>(`http://localhost:8082/projets/getAllProjects`);
  }
  getAllAssigns(): Observable<Assignements[]> {
    return this.http.get<Assignements[]>(`${this.baseUrl}/getAllAssigns`);
  }
  createAssignementForProject(projectId: number, assignements: Assignements): Observable<Assignements> {
    return this.http.post<Assignements>(`${this.baseUrl}/projets/${projectId}/assignements`, assignements);
  }
  getAssign(id: number): Observable<Assignements> {
    return this.http.get<Assignements>(`${this.baseUrl}/getAssign/${id}`);
  }

  addAssign(assignements: Assignements): Observable<Assignements> {
    return this.http.post<Assignements>(`${this.baseUrl}/ajouterAssign`, assignements);
  }

  updateAssign(id: number, assignements: Assignements): Observable<Assignements> {
    return this.http.put<Assignements>(`${this.baseUrl}/updateAssig/${id}`, assignements);
  }

  removeAssign(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/RemoveAssign/${id}`);
  }

  getAssignmentsForProject(projectId: number): Observable<Assignements[]> {
    return this.http.get<Assignements[]>(`${this.baseUrl}/${projectId}/getAssignmentsForProject`);
  }

  getAssignmentsUpdatedAfterDate(projectId: number, date: string): Observable<Assignements[]> {
    return this.http.get<Assignements[]>(`${this.baseUrl}/${projectId}/getAssignmentsUpdatedAfterDate?date=${date}`);
  }

  getLastAssignments(projectId: number, limit: number): Observable<Assignements[]> {
    return this.http.get<Assignements[]>(`${this.baseUrl}/${projectId}/getLastAssignments?limit=${limit}`);
  }
  createAssignement(projectId: number, assignement: Assignements): Observable<Assignements> {
    return this.http.post<Assignements>(`http://localhost:8082/assignements/ajouterby/${projectId}`, assignement);
  }
  
}

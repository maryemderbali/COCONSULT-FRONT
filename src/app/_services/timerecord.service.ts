import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeRecord } from '../_models/timerecord'; // Assurez-vous d'avoir le bon chemin pour votre modèle TimeRecord

@Injectable({
  providedIn: 'root'
})
export class TimeRecordService {
  private baseUrl = 'http://localhost:8082/time-records'; // Assurez-vous de changer l'URL en fonction de votre backend Spring

  constructor(private http: HttpClient) { }

  getAllTimeRecords(): Observable<TimeRecord[]> {
    return this.http.get<TimeRecord[]>(`${this.baseUrl}/getAllTimeRec`);
  }

  getTimeRecordById(id: number): Observable<TimeRecord> {
    return this.http.get<TimeRecord>(`${this.baseUrl}/getTimeRecById/${id}`);
  }

  addTimeRecord(timeRecord: TimeRecord): Observable<TimeRecord> {
    return this.http.post<TimeRecord>(`${this.baseUrl}/ajouterTimeRec`, timeRecord);
  }

  updateTimeRecord(id: number, timeRecord: TimeRecord): Observable<TimeRecord> {
    return this.http.put<TimeRecord>(`${this.baseUrl}/updateTimeRec/${id}`, timeRecord);
  }

  removeTimeRecord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteTimeRec/${id}`);
  }
  getTimeRecordsByCriteria(criteria: any): Observable<TimeRecord[]> {
    let params = new HttpParams();
    // Ajoutez les critères de recherche aux paramètres de requête
    Object.keys(criteria).forEach(key => {
      params = params.append(key, criteria[key]);
    });
    return this.http.get<TimeRecord[]>(`${this.baseUrl}/getTimeRecByCriteria`, { params });
  }
  getTimeRecordsForProject(projectId: number): Observable<TimeRecord[]> {
    return this.http.get<TimeRecord[]>(`${this.baseUrl}/getTimeRecForProject/${projectId}`);
  }

  // Récupérer les enregistrements de temps pour un utilisateur spécifique
  getTimeRecordsForUser(userId: number): Observable<TimeRecord[]> {
    return this.http.get<TimeRecord[]>(`${this.baseUrl}/getTimeRecForUser/${userId}`);
  }

  // Calculer le temps total passé sur un projet
  getTotalTimeForProject(projectId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/getTotalTimeForProject/${projectId}`);
  }

  // Valider les enregistrements de temps
 /* validateTimeRecords(records: TimeRecord[]): Observable<boolean> {
    // Implémentez la logique de validation ici
  }*/
}

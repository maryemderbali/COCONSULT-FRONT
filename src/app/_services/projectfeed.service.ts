import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjFeed } from '../_models/projectFeed';

@Injectable({
  providedIn: 'root'
})
export class ProjFeedService {
  private baseUrl = 'http://localhost:8082/projfeeds'; // Port modifié en 8082

  constructor(private http: HttpClient) { }

  getAllProjFeeds(): Observable<ProjFeed[]> {
    return this.http.get<ProjFeed[]>(`${this.baseUrl}/getAllPrjFeed`);
  }

  getProjFeedById(id: number): Observable<ProjFeed> {
    return this.http.get<ProjFeed>(`${this.baseUrl}/getPrjFeedById/${id}`);
  }

  addProjFeed(projFeed: ProjFeed): Observable<ProjFeed> {
    return this.http.post<ProjFeed>(`${this.baseUrl}/ajouterPrjFeed`, projFeed);
  }

  updateProjFeed(id: number, projFeed: ProjFeed): Observable<ProjFeed> {
    return this.http.put<ProjFeed>(`${this.baseUrl}/updatePfeed/${id}`, projFeed);
  }

  deleteProjFeed(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deletePrjFeed/${id}`);
  }

  getProjFeedWithProjects(id: number): Observable<ProjFeed[]> {
    return this.http.get<ProjFeed[]>(`${this.baseUrl}/${id}/projects`);
  }

  getProjFeedUpdatedAfterDate(date: string): Observable<ProjFeed[]> {
    return this.http.get<ProjFeed[]>(`${this.baseUrl}/updatedAfterDate/${date}`);
  }

  getLastProjFeeds(limit: number): Observable<ProjFeed[]> {
    return this.http.get<ProjFeed[]>(`${this.baseUrl}/last/${limit}`);
  }

  getTotalProjFeedsCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
}

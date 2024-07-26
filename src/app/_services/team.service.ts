import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../_models/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl: string = 'http://localhost:8082/Team'; // Assurez-vous de mettre à jour l'URL de base avec le bon chemin

  constructor(private httpClient: HttpClient) { }

  addTeam(team: Team): Observable<Team> {
    return this.httpClient.post<Team>(`${this.baseUrl}/addTeam`, team);
  }

  getTeamById(idTeam: number): Observable<Team> {
    return this.httpClient.get<Team>(`${this.baseUrl}/getTeamByID/${idTeam}`);
  }

  deleteTeamById(idTeam: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/deleteTeamById/${idTeam}`);
  }

  editTeamById(idTeam: number, updatedTeam: Team): Observable<Team> {
    return this.httpClient.put<Team>(`${this.baseUrl}/editTeamByID/${idTeam}`, updatedTeam);
  }

  getAllTeams(): Observable<Team[]> {
    return this.httpClient.get<Team[]>(`${this.baseUrl}/getAllTeams`);
  }
  affecterTicketAuser(idTicket: number, username: string): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/affecterTicketAuser/${idTicket}/${username}`, {});
  }
}

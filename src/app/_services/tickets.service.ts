import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Tickets } from '../_models/Tickets';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient : HttpClient) { }

  private baseUrl : string='http://localhost:8082/Ticket';

  getAllTickets(): Observable<Tickets[]> {
    return this.httpClient.get<Tickets[]>(`${this.baseUrl}/getAllTickets`);
  }

  addTicket(ticket: Tickets): Observable<Tickets> {
    return this.httpClient.post<Tickets>(`${this.baseUrl}/addTicket`, ticket);
  }

  // Méthode pour ajouter un ticket et affecter un utilisateur
  addTicketAndAssignUser(ticket: Tickets, username: string): Observable<Tickets> {
    return this.httpClient.post<Tickets>(`${this.baseUrl}/addTicketandaffecteruser/${username}`, ticket);
  }
  
  assignTicketToUser(ticketId: number, username: string): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/affecterTicketAuser/${ticketId}/${username}`, null);
  }

  getTicketById(ticketId: number): Observable<Tickets> {
    return this.httpClient.get<Tickets>(`${this.baseUrl}/getTicketByID/${ticketId}`);
  }

  deleteTicketById(ticketId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/deleteTicketById/${ticketId}`);
  }

  editTicketById(ticketId: number, updatedTicket: Tickets): Observable<Tickets> {
    return this.httpClient.put<Tickets>(`${this.baseUrl}/editTicketByID/${ticketId}`, updatedTicket);
  }
  getAssignedUserNameByTicketId(ticketId: number): Observable<string> {
    return this.httpClient.get<string>(`${this.baseUrl}/getAssignedUserNameByTicketId/${ticketId}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching assigned user name:', error);
          throw error; // Re-throw the error to propagate it to the caller
        })
      );
  }

  
  
}

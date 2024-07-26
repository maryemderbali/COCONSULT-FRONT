import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting } from '../_models/Meeting';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private baseUrl: string = 'http://localhost:8082/Meeting';

  constructor(private httpClient: HttpClient) { }

  getAllMeetings(): Observable<Meeting[]> {
    return this.httpClient.get<Meeting[]>(`${this.baseUrl}/getAllMeetings`);
  }

  addMeeting(meeting: Meeting): Observable<Meeting> {
    return this.httpClient.post<Meeting>(`${this.baseUrl}/addmeet`, meeting);
  }

  getMeetingById(idMeeting: number): Observable<Meeting> {
    return this.httpClient.get<Meeting>(`${this.baseUrl}/getMeetingById/${idMeeting}`);
  }

  deleteMeetingById(idMeeting: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/deleteMeetingByID/${idMeeting}`);
  }

  editMeetingById(idMeeting: number, updatedMeeting: Meeting): Observable<Meeting> {
    return this.httpClient.put<Meeting>(`${this.baseUrl}/editMeetingByID/${idMeeting}`, updatedMeeting);
  }

  addMeetingAndAssignToProject(meeting: Meeting, projectTitle: string): Observable<Meeting> {
    return this.httpClient.post<Meeting>(`${this.baseUrl}/addMeetingAndAssignToProject/${projectTitle}`, meeting);
  }
  affecterUserAmeet(idMeeting: number, username: string): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/affecterUserAmeet/${idMeeting}/${username}`, null);
  }
  getUsersByMeetingId(idMeeting: number): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/getUsersByMeetingId/${idMeeting}`);
  }

}

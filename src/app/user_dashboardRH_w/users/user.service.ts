import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8082/api/user/list-user'; 

  constructor(private http: HttpClient) { }
  private currentUserSubject = new BehaviorSubject<any>(null);

  setCurrentUser(user: any) {
    this.currentUserSubject.next(user);
  }

  getCurrentUser() {
    return this.currentUserSubject.asObservable();
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getUserProfile(userId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8082/api/user/getuserbyid/${userId}`);
  }
  getCandidatPhoto(id: number): Observable<Blob> {
    // URL de l'API
    let url = `http://localhost:8082/candidats/${id}/photo`;
    return this.http.get(url, { responseType: 'blob' });
  }
}

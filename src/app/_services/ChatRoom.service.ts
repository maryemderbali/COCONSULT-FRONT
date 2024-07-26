import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { environment } from 'src/environments/environment';
import { Chat } from '../_models/Chat';

@Injectable({ providedIn: 'root' })
export class ChatService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}
    private baseUrl = 'http://localhost:8082/api/Chat';

  
    sendChat(senderId: number, groupId: number, messageContent: string): Observable<Chat> {
      return this.http.post<Chat>(`${this.baseUrl}/sendChat/${senderId}/${groupId}/${messageContent}`, {});
    }
  
    getAllChatsByUser(userId: number): Observable<Chat[]> {
      return this.http.get<Chat[]>(`${this.baseUrl}/getAlllChatsByUser/${userId}`);
    }
  
    getAllChatsPerGroup(groupChatId: number): Observable<Chat[]> {
      return this.http.get<Chat[]>(`${this.baseUrl}/getAllchatsPerGroup/${groupChatId}`);
    }
  
    broadcastMessage(message: string): Observable<void> {
      return this.http.post<void>(`${this.baseUrl}/broadcastMSG/${message}`, {});
    }
    }  
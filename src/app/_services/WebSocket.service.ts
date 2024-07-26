import { Injectable } from '@angular/core';
import { Chat } from '../_models/Chat';
import { of, Subject,Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { map, catchError } from 'rxjs/operators';
import * as stomp from '@stomp/stompjs';
import { Client, Message } from '@stomp/stompjs';

import { HttpClient } from '@angular/common/http';
import { GroupChat } from '../_models/GroupChat';
import { User } from '../_models';
import { GroupChatservice } from './GroupChat.service';
import { AccountService } from './account.service';
@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    public stompClient: any;
    public messagesSubject = new Subject<any>();
    messages$ = this.messagesSubject.asObservable();
    GroupChat: GroupChat;
    groupChatid: number;
    currentuser: User;
    constructor(private http: HttpClient,private GroupChatservice: GroupChatservice,private accountservice:AccountService) { 
      this.currentuser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}') as User;
      this.GroupChat = this.accountservice.getCurrentGroupChatValue() as GroupChat || JSON.parse(localStorage.getItem('currentGroupChat') )as GroupChat;
      this.groupChatid = this.GroupChat.id;
        console.info('groupchatid:', this.groupChatid);
      
    }
    
    connect(): void {
      this.stompClient = new Client({
        webSocketFactory: () => new WebSocket('ws://localhost:8081/ws')
      });
  
      this.stompClient.onConnect = () => {
        console.log('Connected to WebSocket server');
        // Subscribe to your desired destination

        this.stompClient.subscribe('/topic/groupChat/' + this.groupChatid, (message) => {
          this.messagesSubject.next(message);
        }
      );
      };
  
      this.stompClient.onStompError = (error) => {
        console.error('STOMP protocol error:', error);
      };
  
      this.stompClient.activate();
    }
    // Method to subscribe to the specified group chat topic
subscribeToGroupChatMessages(groupChatId: number): void {
 
    // Subscribe to the topic where group chat messages are being broadcasted
    this.stompClient.subscribe('/topic/groupChat/' + groupChatId, (message: any) => { 
      const receivedMessage = message.body;
      // Handle the received message here, such as emitting it through an observable
      this.messagesSubject.next(receivedMessage);
    });
  
}
     subscribeToTopic(groupChatid: number) {
      this.stompClient.subscribe('/topic/groupChat/' + groupChatid, (message: any) => { 
        const chatMessage = JSON.parse(message.body);
        this.messagesSubject.next(chatMessage);
      });
    }
  
    sendMessage(destination: string, message: any): void {
      if (this.stompClient && this.stompClient.connected) {
        this.stompClient.publish({ destination, body: JSON.stringify(message) });
      } else {
        console.error('WebSocket connection not established.');
      }
    }
    disconnect(): void {
      if (this.stompClient && this.stompClient.connected) {
        this.stompClient.deactivate();
      }
    }
  
    getMessages(): Observable<any> {
      return this.messagesSubject.asObservable();
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GroupChat } from '../_models/GroupChat';
import { RoleName } from '../_models/Role';
import { User } from '../_models';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class GroupChatservice {
    private apiUrl = 'http://localhost:8082/api/GroupChat'; // replace with your API URL
    private apiurl1='http://localhost:8082/api/Chat';
    constructor(
        private router: Router,
        private http: HttpClient
    ) {}
    createGroupChat(groupChat: GroupChat): Observable<GroupChat> {
        return this.http.post<GroupChat>(`${this.apiUrl}/createGP`, groupChat)
        .pipe(
            catchError(error => {
              let errorMessage = error.error.message || 'An error occurred while saving group chat. Please try again later.';
              Swal.fire({ icon: 'error', title: 'Oops...', text: errorMessage });
              return throwError(errorMessage);
            })
          );
        
    }
    getchatpergroupchat(groupId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiurl1}/getAllchatsPerGroup/${groupId}`);
    }
    addUserToGroupChatByRole(IdGroupChat: number, IdUser: [number]) : Observable<void>{
        return this.http.put<void>(`${this.apiUrl}/addUserToGroupChatByRole/${IdGroupChat}/${IdUser}`, null);
    }

    removeUserFromGroupChat(groupChat: GroupChat, user: User): Observable<GroupChat>{
        return this.http.delete<GroupChat>(`${this.apiUrl}/removeUserFromGroupChat`, { body: { groupChat, user } });
    }
   updateGroupChat(groupId: number, groupTitle: string, rules: string): Observable<GroupChat>{
        return this.http.post<GroupChat>(`${this.apiUrl}/updateGroupChat/${groupId}/${groupTitle}/${rules}`, null);
    }
    /*updateGroupChat(groupChat: GroupChat): Observable<GroupChat>{
        return this.http.post<GroupChat>(`${this.apiUrl}/updateGroupChat`, groupChat);
    }*/
    getAllGroupChatsByRole(roleName: RoleName): Observable<GroupChat[]>{
        return this.http.get<GroupChat[]>(`${this.apiUrl}/getAllGroupChatsByRole/${roleName}`);
    }

    getAllGroupChats():Observable<GroupChat[]> {
        return this.http.get<GroupChat[]>(`${this.apiUrl}/getAllGroupChats`);
    }

    getGroupChatById(groupId: number): Observable<GroupChat>{
        return this.http.get<GroupChat>(`${this.apiUrl}/getGroupChatById/${groupId}`);
    }
    getGroupChatByUser(userid: number): Observable<GroupChat>{
        return this.http.get<GroupChat>(`${this.apiUrl}/getGroupChatByuser/${userid}`);
    }
    
    bannedUser(bannedUser: number): Observable<User>{
        return this.http.post<User>(`${this.apiUrl}/banneduser/${bannedUser}`, null);
    }

    deleteGroupChat(groupId: number): Observable<GroupChat>{
        return this.http.delete<GroupChat>(`${this.apiUrl}/deleteGroupChat/${groupId}`);
    }

    removeBan(idUser: number): Observable<User>{
        return this.http.post<User>(`${this.apiUrl}/removeban/${idUser}`, null);
    }

    getAvailableUsers() : Observable<User[]>{
        return this.http.get<User[]>(`${this.apiUrl}/getavailableusers`);
    }
}
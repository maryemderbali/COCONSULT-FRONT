import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {Message}from 'src/app/admin/notifications/message';
import { AuthService } from '../login/auth.service';
@Injectable({
  providedIn: 'root'
})



export class MsgService {

  
  private baseURL  ="http://localhost:8082/Msg/create";

  message: Message=new Message();

  constructor(private httpClient: HttpClient,private authService: AuthService) { }
 
  createMessage(message: Message): Observable<any>{
    //const token = this.authService.getAuthToken();

   
      return this.httpClient.post(this.baseURL, message);
    }
  }

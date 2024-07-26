import { Injectable } from '@angular/core';
import {Bilan} from './Bilan';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BilanService {
  private baseURL  ="http://localhost:8081/api/Bilan/get-Bilan-By-User";


  constructor(private httpClient: HttpClient,private authService: AuthService) { }

  getBilanList(): Observable<any>{
    const token = this.authService.getAuthToken();

    var headers =new HttpHeaders({
      Authorization: `access ${token}`
    })
    return this.httpClient.get(this.baseURL ,{headers});
    
  }
}

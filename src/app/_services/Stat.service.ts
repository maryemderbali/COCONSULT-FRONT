import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { environment } from 'src/environments/environment';
import { OTP } from '../_models/OTP';

@Injectable({ providedIn: 'root' })
export class StatService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}
    private baseUrl = 'http://localhost:8082/api/Stats';


  getUsersPerDay(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usersPerDay`);
  }

  getUsersByRoles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usersByRoles`);
  }
    
}


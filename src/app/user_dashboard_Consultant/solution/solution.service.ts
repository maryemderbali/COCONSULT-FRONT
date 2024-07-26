import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  constructor(private http: HttpClient) {}

  getSolutionList(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8081/api/Solution/list-Solution');
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {
  private baseUrl = 'http://localhost:8082/revenue'; // Update with your Spring Boot API URL

  constructor(private http: HttpClient) { }

  getTotalRevenueByYear(): Observable<Map<number, number>> {
    return this.http.get<Map<number, number>>(`${this.baseUrl}/totalByYear`);
  }

  getTotalRevenueByMonth(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}/totalByMonth`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

  export class SalaryService {
    private baseUrl = 'http://localhost:8082/api/user';
    private salaireBaseUrl = 'http://localhost:8082/api/salaire'
    constructor(private http: HttpClient) { }

    getEmployees(): Observable<any> {
        return this.http.get(`${this.baseUrl}/list-RolesName/Employee`);
      }
      addSalary(salaryData: any): Observable<any> {
        return this.http.post(`${this.salaireBaseUrl}/add-salaire`, salaryData);
      }
      getUserSalaries(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.salaireBaseUrl}/get-salaire-by-user/${userId}`);
      }

      getAllSalaries(): Observable<any[]> {
        return this.http.get<any[]>(`${this.salaireBaseUrl}/getall-salaire`);
      }

      deleteSalary(id: number): Observable<any> {
        return this.http.delete(`${this.salaireBaseUrl}/delete-salaire/${id}`);
      }

      editSalary(salaryData: any): Observable<any> {
        return this.http.put(`${this.salaireBaseUrl}/update-salaire`, salaryData);
      }

    }


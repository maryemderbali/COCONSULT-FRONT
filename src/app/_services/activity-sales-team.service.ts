import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { SalesActivity } from '../_models/ActivitySalesTeam';

@Injectable({
  providedIn: 'root'
})
export class ActivitySalesTeamService {
  private baseUrl = 'http://localhost:8082/ActivitySalesTeam'; 

  constructor(private http: HttpClient) { }

  getAllActivitySalesTeam(): Observable<SalesActivity[]> {
    return this.http.get<SalesActivity[]>(`${this.baseUrl}/GetAllActSalesTeam`);
  }

  getActivitySalesTeamById(id: number): Observable<SalesActivity> {
    return this.http.get<SalesActivity>(`${this.baseUrl}/GetActSalesTeamByID/${id}`);
  }

  addActivitySalesTeam(activity: SalesActivity): Observable<SalesActivity> {
    return this.http.post<SalesActivity>(`${this.baseUrl}/ajouterActSalesTeam`, activity);
  }

  updateActivitySalesTeam( activity: SalesActivity): Observable<SalesActivity> {
    const id = activity.idActSale; 
    return this.http.put<SalesActivity>(`${this.baseUrl}/updateActSalesTeam/${id}`, activity);
  }

 

  deleteActivitySalesTeam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/RemoveActSales/${id}`);
  } 

  getActivitySalesTeamByClass(classSalesTeam: string): Observable<SalesActivity[]> {
    return this.http.get<SalesActivity[]>(`${this.baseUrl}/GetActivitySalesTeamByClass/${classSalesTeam}`);
  }

  updateActivityStatus(id: number): Observable<SalesActivity> {
    return this.http.put<SalesActivity>(`${this.baseUrl}/updateStatus/${id}`, {});
  }

  addActivitySalesTeamAffectRep(activitysalesteam: SalesActivity, repertoireId: number): Observable<SalesActivity> {
    const url = `${this.baseUrl}/ajouterActivitySalesTeam/${repertoireId}`;
    return this.http.post<SalesActivity>(url, activitysalesteam).pipe(
      catchError(error => {
        throw 'Error while adding contract: ' + error; 
      })
    );
  }
  addActivitySalesTeamAffectRepAndSendSMS(activitysalesteam: SalesActivity, repertoireId: number): Observable<SalesActivity> {
    const url = `${this.baseUrl}/ajouterActivitySalesTeamSendSMS/${repertoireId}`;
    return this.http.post<SalesActivity>(url, activitysalesteam).pipe(
      catchError(error => {
        throw 'Error while adding contract: ' + error; 
      })
    );
  }
}

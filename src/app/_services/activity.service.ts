import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../_models/Activity';


@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private httpClient : HttpClient) { }

  private baseUrl : string='http://localhost:8082/Activity'; 

  getAllActivities(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(`${this.baseUrl}/getAllActivities`);
  }

  addActivity(activity: Activity, projectTitle: string): Observable<Activity> {
    return this.httpClient.post<Activity>(`${this.baseUrl}/addActivity/${projectTitle}`, activity);
  }
  
  editActivity(activityId: number, updatedActivity: Activity): Observable<Activity> {
    return this.httpClient.put<Activity>(`${this.baseUrl}/editActivityByID/${activityId}`, updatedActivity);
  }
  getActivityBayID(activityId: number): Observable<Activity> {
    return this.httpClient.get<Activity>(`${this.baseUrl}/getActivityByID/${activityId}`);
  }
  deleteActivity(activityId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/DeleteActivityByID/${activityId}`);
  }
  
  
  

}

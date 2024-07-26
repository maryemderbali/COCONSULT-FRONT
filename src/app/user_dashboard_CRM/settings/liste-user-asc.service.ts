import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ListeUserAscService {
  private baseUserRole  ="http://localhost:8081/api/user/by-role/asc/{roleName}";


  constructor(private http: HttpClient) {}

  getListUserAsc(): Observable<any[]>{
    
    return this.http.get<any[]>("http://localhost:8081/api/user/list-Userco2/ASC");
  }

  
  getUserByRoles(RolesName:String):Observable<any>{
    const url = `${this.baseUserRole}`+RolesName;
    return this.http.get<any>(url);
  }


  
}

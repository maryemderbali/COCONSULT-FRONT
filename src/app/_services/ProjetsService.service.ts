import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Projects} from '../_models/projects';
import {Expanses} from '../_models/expanses';
import {Assignements} from '../_models/assignements';




@Injectable({
    providedIn: 'root'
})
export class ProjetsService {
    private baseUrl = 'http://localhost:8082/projets';

    constructor(private http: HttpClient) { }


    getAllProjets(): Observable<Projects[]> {
        return this.http.get<Projects[]>(`${this.baseUrl}/getAllProjects`);
    }

    getProjetsById(id: number): Observable<Projects> {
        return this.http.get<Projects>(`${this.baseUrl}/getProjectById/${id}`);
    }

    addProjets(projets: Projects): Observable<Projects> {
        return this.http.post<Projects>(`${this.baseUrl}/addproject`, projets);
    }

    updateProjets(id: number, projets: Projects): Observable<Projects> {
        return this.http.put<Projects>(`${this.baseUrl}/updateProject/${id}`, projets);
    }

    deleteProjets(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/deleteProject/${id}`);
    }

    getExpansesForProject(projectId: number): Observable<Expanses[]> {
        return this.http.get<Expanses[]>(`${this.baseUrl}/${projectId}/expanses`);
    }

    getAssignementsForProject(projectId: number): Observable<Assignements[]> {
        return this.http.get<Assignements[]>(`${this.baseUrl}/${projectId}/assignements`);
    }

    createAssignementForProject(projectId: number, assignements: Assignements): Observable<Assignements> {
        return this.http.post<Assignements>(`${this.baseUrl}/${projectId}/assignements`, assignements);
    }
    /*
      createMeetingForProject(projectId: number, meeting: Meetings): Observable<Meetings> {
        return this.http.post<Meetings>(`${this.baseUrl}/${projectId}/meetings`, meeting);
      }*/
    /* validateProject(idProject: number): Observable<void> {
       return this.http.put<void>(`${this.baseUrl}/validateProject/${idProject}`, null);
     }*/
    /*validateProject(idProject: number, isvalid:boolean): Observable<any> {
      return this.http.put<void>(`${this.baseUrl}/validateProject/${idProject}`, null).pipe(
          tap(value=> {
            this.toaster.success('Project validated and assigned successfully', 'Success');
          }),
          catchError(error => {
            this.toaster.error('An error occurred while validating the project', 'Error');
            return throwError(error);
          })
      );
    }*/

    /* validateProject(idProject: number, valid: boolean): Observable<void> {
       return this.http.put<void>(`${this.baseUrl}/validateProject/${idProject}?isValid=${valid}`, null).pipe (
           tap(value=> {
             console.log('Project validated and assigned successfully', 'Success');
           }),
           catchError(error => {
             console.log('An error occurred while validating the project', 'Error');
             return throwError(error);
           })
       );
     }*/
    validateProject(id: number, isValid: boolean): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/validateProject/${id}?isValid=${isValid}`, null);
    }
    getProjectCountsByTitle() {
        return this.http.get<any>(`${this.baseUrl}/counts-by-title`);

    }
    getProjectDurations(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/durations`);
    }
    getProjetsByDateRange(startDate: Date, endDate: Date): Observable<Projects[]> {
        const params = new HttpParams()
            .set('start', startDate.toISOString().slice(0, 10))
            .set('end', endDate.toISOString().slice(0, 10));

        return this.http.get<Projects[]>(this.baseUrl, { params });
    }
}

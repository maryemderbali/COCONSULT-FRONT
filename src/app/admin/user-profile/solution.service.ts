import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Solution } from './solution';

@Injectable({
  providedIn: 'root'
})
export class solutionService {
  

  private baseURLsolution  ="http://localhost:8081/api/Solution/add-solution";

  solution: Solution=new Solution();

  constructor(private httpClient: HttpClient) { }
 
    
  createSolution(solution: Solution): Observable<object>{
      return this.httpClient.post(this.baseURLsolution, solution);
      }
}
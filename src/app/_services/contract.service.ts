import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Contract } from '../_models/Contract';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private baseUrl = 'http://localhost:8082/Contract'; // Update with your Spring Boot API URL

  constructor(private http: HttpClient) {}

  getAllContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.baseUrl}/GetAllContract`);
  }

  addContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(`${this.baseUrl}/ajouterContract`, contract);
  }

  addContractAffectRep(contract: Contract, repertoireId: number): Observable<Contract> {
    const url = `${this.baseUrl}/ajouterContract/${repertoireId}`;
    return this.http.post<Contract>(url, contract).pipe(
      catchError(error => {
        throw 'Error while adding contract: ' + error; 
      })
    );
  }

  addContractAffectRepAndGeneratePdf(contract: Contract, repertoireId: number): Observable<Blob> {
    const url = `${this.baseUrl}/addContractAndGeneratePdf/${repertoireId}`;
    return this.http.post(url, contract, { responseType: 'blob' }).pipe(
      catchError(error => {
        return throwError('Error while adding contract and generating PDF: ' + error);
      })
    );
  }

  updateContractAffectREpo(contractId: number, repertoireId: number, updatedContract: Contract): Observable<Contract> {
    return this.http.put<Contract>(`${this.baseUrl}/updateContractAffectRepo/${contractId}/repertoire/${repertoireId}`, updatedContract);
  }

  getContract(contractId: number): Observable<Contract> {
    return this.http.get<Contract>(`${this.baseUrl}/GetContract/${contractId}`);
  }

  getRepertoireContactByContractId(idContract: number): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/${idContract}/repertoireContact`);
  }

  updateContract(updatedContract: Contract): Observable<Contract> {
    const id = updatedContract.idContract; // Assuming idContract is the correct property name
    return this.http.put<Contract>(`${this.baseUrl}/updateContract/${id}`, updatedContract);
  }
  


  removeContract(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/RemoveContract/${id}`);
  }

  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../_models/Payment';
import { ContractVerificationResult } from '../_models/ContractVerificationResult';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private baseUrl = 'http://localhost:8082/Payment'; // Update with your Spring Boot API URL

  constructor(private http: HttpClient) { }

  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/GetAllPayment`);
  }

  getPaymentById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}/GetPaymentByID/${id}`);
  }

  addPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.baseUrl}/ajouterPayment`, payment);
  }

  updatePayment(id: number, payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.baseUrl}/updatePayment/${id}`, payment);
  }

  removePayment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/RemovePayment/${id}`);
  }

  uploadPaymentsData(file: any): Observable<any> {
   // const formData: FormData = new FormData();
    //formData.append('file', file);
    return this.http.post<any>(`${this.baseUrl}/upload-payments-data`, file);
  } 

  verifyPayments(): Observable<ContractVerificationResult[]> {
    return this.http.get<ContractVerificationResult[]>(`${this.baseUrl}/verifyPayments`);
  }
  
}

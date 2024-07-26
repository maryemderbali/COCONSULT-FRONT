import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contract } from '../_models/Contract';
import { Invoice } from '../_models/Invoice';
import { Payment } from '../_models/Payment';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  importCSV(fileName: string) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:8082/invoices'; // Update with your Spring Boot API URL

  constructor(private http: HttpClient) { }

  getAllInvoice(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.baseUrl}/GetAllInvoice`);
  }

  generateInvoices(contract: Contract): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/generate`, contract);
  }

  calculateInvoiceTotal(id: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total/${id}`);
  }

  recordPayment(invoiceId: number, payment: Payment): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${invoiceId}/record-payment`, payment);
  }

  updateInvoiceStatus(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/update-status`, null);
  }

  updateContractStatus(contract: Contract): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/update-contract-status`, contract);
  }

  getInvoicesByContract(contractId: number): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.baseUrl}/contract/${contractId}`);
  }

  getOverdueInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.baseUrl}/overdue`);
  }

  exportDataToCSV(fileName: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/export-csv/${fileName}`, null);
  }

  importDataFromCSV(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const url = `${this.baseUrl}/import-csv`;
    return this.http.post(url, formData);
  }
}

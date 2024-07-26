import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContractVerificationResult } from 'src/app/_models/ContractVerificationResult';
import { PaymentsService } from 'src/app/_services/payments.service';
import { CoreService } from '../core.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  displayedColumns: string[] = ["repertoire", "Verification"];

  dataSource = new MatTableDataSource<ContractVerificationResult>([]); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private paymentsService: PaymentsService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.PaymentsList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.paymentsService.uploadPaymentsData(formData).subscribe(
          response => {
            console.log('payment data uploaded successfully:', response);
            // Handle success message or any other action
          },
          error => {
            console.error('Error uploading payment data:', error);
            // Handle error message or any other action
          }
      );
    }
  }


  PaymentsList() {
    this.paymentsService.verifyPayments().subscribe(
      (data: ContractVerificationResult[]) => {
        console.log('Received data:', data);
        this.dataSource.data = data; // Assign data directly to the dataSource
      },
      error => {
        console.error('Error retrieving payment data:', error);
        // Handle error message or any other action
      }
    );
  }
  
}

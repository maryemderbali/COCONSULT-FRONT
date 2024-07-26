import { Component, OnInit , ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalaryService } from './salary.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditSalaryModalComponent } from './edit.salary.component';
@Component({
    templateUrl: './display-salaries.component.html'
  })

  export class DisplaySalariesComponent implements OnInit {
    displayedColumns: string[] = ['amount', 'impot', 'currency', 'date','actions']; // Add more columns if needed
    dataSource = new MatTableDataSource<any>([]);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    selectedUserId: number;

    employees: any[];
  selectedUser: any;
  salaries: any[];
  constructor(
    private salaryService: SalaryService,
private dialog : MatDialog  
  )
     { }
  ngOnInit(): void {
    this.fetchEmployees();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchEmployees() {
    this.salaryService.getEmployees().subscribe(
      (data: any[]) => {
        this.employees = data;
        console.log('Fetched employees:', this.employees); 
      },
      error => {
        console.log('Error fetching employees:', error);
      }
    );
  }

  onUserSelect() {
    if (!this.selectedUserId) {
      return;
    }

    this.salaryService.getUserSalaries(this.selectedUserId).subscribe(
      (data: any[]) => {
        this.salaries = data;
        console.log('Fetched salaries:', this.salaries);
        this.dataSource.data = this.salaries;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.paginator.pageSize = 5;

      },
      error => {
        console.error('Error fetching salaries:', error);
      }
    );
  }

  resetForm() {
    this.selectedUserId = 0;
    this.selectedUser = null;
    this.salaries = [];
    this.dataSource.data = [];
  }

  deleteSalary(salary: any) {
    if (!salary ) {
      return;
    }
  
    const salaryId = salary.idSal;
  
    this.salaryService.deleteSalary(salaryId).subscribe(
      () => {
        console.log('Salary deleted successfully');
        this.salaries = this.salaries.filter(s => s.idSal !== salaryId);
        this.dataSource.data = this.salaries;
      },
      error => {
        console.error('Error deleting salary:', error);
      }
    );
  }

  editSalary(salary: any) {
    if (!salary) {
      return;
    }
    const dialogRef = this.dialog.open(EditSalaryModalComponent, {
      width: '600px',
      data: { salary }
    });
    
  }
  
  


}
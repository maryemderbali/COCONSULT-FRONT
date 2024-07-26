import { Component, OnInit, ViewChild } from '@angular/core';
import { SalaryService } from 'src/app/user_dashboardRH_w/salary/salary.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  templateUrl: './list-salaire.html'
})

export class AdminListSalaire implements OnInit {
  displayedColumns: string[] = ['amount', 'impot', 'currency', 'date', 'actions'];
  salaries: any[];

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private salaryService: SalaryService) {}

  ngOnInit(): void {
    this.fetchSalaries();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchSalaries() {
    this.salaryService.getAllSalaries().subscribe(
      (data: any[]) => {
        this.salaries = data;
        this.dataSource.data = this.salaries;
      },
      error => {
        console.error('Error fetching salaries:', error);
      }
    );
  }

  editSalary(salary: any) {
    // Implement edit logic here
  }

  deleteSalary(salary: any) {
    // Implement delete logic here
  }
}

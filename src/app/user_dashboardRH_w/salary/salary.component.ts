import { Component, OnInit } from '@angular/core';
import { SalaryService } from './salary.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {

  employees : any[];
  selectedUserId: number;
  salaries: any[];
  selectedUser: any;
  salary: number; 
  impot : number;
  currency : string;

  constructor(private salaryService: SalaryService ,private router: Router) { }

  ngOnInit(): void {
    this.fetchEmployees();
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
  addSalary() {
      // Verify that all fields are not empty
      if (!this.selectedUser || !this.salary || !this.impot || !this.currency) {
        alert('Please fill in all fields');
        return;
      }
  
      // Call the endpoint to add salary
      const newSalary = {
        salaire: this.salary,
        impot: this.impot,
        currency: this.currency,
        user: {
          id: this.selectedUser.id
        }
      };
  
      this.salaryService.addSalary(newSalary).subscribe(
        response => {
          // Handle successful response
          console.log('Salary added successfully:', response);
          // Optionally, you can reset the form fields here
          this.resetForm();
        },
        error => {
          // Handle error
          console.error('Error adding salary:', error);
        }
      );
    }
  
    resetForm() {
      // Reset form fields
      this.selectedUser = null;
      this.salary = null;
      this.impot = null;
      this.currency = null;
    }

    onUserSelect() {
      if (this.selectedUserId) {
        // Fetch salaries for the selected user ID
        this.salaryService.getUserSalaries(this.selectedUserId).subscribe(
          (salaries: any[]) => {
            this.salaries = salaries;
            console.log('User salaries:', this.salaries);
          },
          error => {
            console.error('Error fetching salaries:', error);
          }
        );
      } else {
        this.salaries = null;
      }
    }
   
  }



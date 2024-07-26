import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CongeService } from './conge-service';
import { SalaryService } from '../salary/salary.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-add-conge-modal',
    templateUrl: './add-conge-modal.component.html',
    styleUrls: ['./add-conge-modal.component.css']
  })
  export class AddCongeModalComponent {
    users: any[]; // Array to store the list of users
  dateDebut: string;
  typeConge: string;
  duree: number;
  userId: number;
  selectedUserSoldeConge: number;

    constructor(public dialogRef: MatDialogRef<AddCongeModalComponent>,
        private congeService: CongeService,
        private salaryService :SalaryService) {}
  
    ngOnInit() {
        this.fetchUsers(); // Fetch the list of users when the component initializes
      }
      fetchUsers() {
        this.salaryService.getEmployees().subscribe(
          (data: any[]) => {
            this.users = data;
            console.log('Fetched employees:', this.users); 
          },
          error => {
            console.log('Error fetching employees:', error);
          }
        );
      }
    close(): void {
      this.dialogRef.close();
    }
    submitForm(congeForm: NgForm) {
        if (congeForm.valid) {
          const newConge = {
            dateDebut: this.dateDebut,
            typeConge: this.typeConge,
            duree: this.duree,
            user: {
              id: this.userId
            }
          };
    
          this.congeService.addConge(newConge).subscribe(
            (response: any) => {
              console.log('Conge added successfully:', response);
              this.dialogRef.close(); // Close the dialog after adding the conge
            },
            error => {
              console.error('Error adding conge:', error);
            }
          );
        } else {
          console.log('Form is invalid');
        }
      }
      onUserSelect() {
        if (this.userId) {
            console .log(this.userId);
            const selectedUser = this.users.find(user => user.id == this.userId);
          this.selectedUserSoldeConge = selectedUser.soldeConge;
        }
      }
  

  }
import { Component, OnInit } from '@angular/core';
import { UserService } from '../users/user.service';
import { EvaluationService } from './evaluation.service';

@Component({
  selector: 'app-evaluation-manager',
  templateUrl: './evaluation.manager.component.html',
  styleUrls: ['./evaluation.manager.component.css']

})
export class EvaluationManagerComponent implements OnInit {
  users: any[] = []; // Initialized as an empty array
  selectedUser: any = null; // Now any type, consider creating a User model
  evaluationRange: number = 0; // Default initial value
  description: string = '';
  evaluatorType: string = 'HR'; // Default to HR, or another sensible default
  criteria1: number = 0;
  criteria2: number = 0;
  criteria3: number = 0;

  constructor(private userService: UserService, private evaluationService: EvaluationService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      if (user) { // Check for user
        this.selectedUser = user;
      } else {
        // Handle the case where no user is set (redirect or fetch default?)
        console.error('No user set');
      }
    });
    this.fetchUsers(); // Fetch users if needed or implement another method to handle users
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
        (data: any[]) => {
          this.users = data;
        },
        error => {
          console.error('Error fetching users:', error);
        }
    );
  }

  submitForm() {
    if (!this.selectedUser || !this.description || !this.evaluatorType) {
      alert('Please fill out all required fields.'); // More user-friendly feedback
      return;
    }

    const totalCriteria = 3;
    const totalEvaluationRange = this.evaluationRange + this.criteria1 + this.criteria2 + this.criteria3;
    const moy = totalEvaluationRange / (totalCriteria + 1); // Include main evaluation range
    const evaluationData = {
      type: this.evaluatorType,
      moy: moy,
      feedBack: this.description,
      user: {
        id: this.selectedUser.id // Assuming id is the correct property
      }
    };

    this.evaluationService.addEvaluation(evaluationData).subscribe(
        response => {
          alert('Evaluation added successfully!');
          this.resetForm(); // Refactor reset into a separate method
        },
        error => {
          console.error('Error adding evaluation:', error);
          alert('Failed to add evaluation.'); // User feedback
        }
    );
  }

  resetForm() {
    this.selectedUser = null;
    this.evaluationRange = 0;
    this.description = '';
    this.evaluatorType = 'HR'; // Reset to default or keep previous value
    this.criteria1 = 0;
    this.criteria2 = 0;
    this.criteria3 = 0;
  }
}

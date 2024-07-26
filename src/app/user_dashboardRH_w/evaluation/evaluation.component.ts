// evaluation.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../users/user.service';
import { EvaluationService } from './evaluation.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  users: any[]; // Array to store the list of users
  selectedUser: number;
  evaluationRange: number;
  description: string;
  evaluatorType: string;

  constructor(private userService: UserService ,private evaluationService: EvaluationService) { }

  ngOnInit() {
    this.fetchUsers(); // Fetch the list of users when the component initializes
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      error => {
        console.log('Error fetching users:', error);
      }
    );
  }

  submitForm() {
    if (!this.selectedUser || !this.evaluationRange || !this.description || !this.evaluatorType) {
      console.log('Please fill out all fields');
      return;
    }

    const evaluationData = {
      type: this.evaluatorType,
      moy: this.evaluationRange,
      feedBack: this.description,
      user: {
        id: this.selectedUser.toString()
      }
    };

    this.evaluationService.addEvaluation(evaluationData).subscribe(
      (response: any) => {
        console.log('Evaluation added successfully:', response);
        // Reset form fields
        this.selectedUser = null;
        this.evaluationRange = null;
        this.description = '';
        this.evaluatorType = '';
      },
      error => {
        console.error('Error adding evaluation:', error);
      }
    );
  }
}

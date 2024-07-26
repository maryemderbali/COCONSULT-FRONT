// verification.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../users/user.service';
import { PointageService } from './pointage.service';

@Component({
    templateUrl: './rappel-pointage.component.html'
})
export class RappelPointageComponent implements OnInit {
    verificationCode: string;
    users: any[] = []; // Initialize as empty array
    selectedUser: number;


    constructor( 
     private userService : UserService,
        private pointageService : PointageService
    ) { 
         
    }

    ngOnInit() {
        // Fetch users when the component initializes
        this.fetchUsers();
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

    verifyReminder() {
       this.pointageService.verifyReminder(this.selectedUser, this.verificationCode).subscribe(
        response => {
          console.log('Reminder verified successfully:', response);
          alert('Reminder verified successfully');
        },
        error => {
          console.error('Error verifying reminder:', error);
        }
        );
    }

}

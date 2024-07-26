import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { EvaluationService } from '../evaluation/evaluation.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
  })

  export class UserProfileComponent implements OnInit {
    userId: number;
    userProfile: any; // Define the type of user profile data
    evaluationRange: number;
  description: string;
  evaluatorType: string;
  averageRating: number;
  photoUrl:any;
    constructor(private route: ActivatedRoute, private userService: UserService,
      private evaluationService: EvaluationService,
      private http: HttpClient
    ) { }
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.userId = params['id'];
        // Fetch user profile data using user ID
        this.userService.getUserProfile(this.userId).subscribe((profile: any) => {
          this.userProfile = { ...profile, availability: profile.disponible };
        });
        this.fetchAverageRating(this.userId);      });
    }

    submitForm() {
      if (!this.userId || !this.evaluationRange || !this.description || !this.evaluatorType) {
        console.log('Please fill out all fields');
        return;
      }
  
      const evaluationData = {
        type: this.evaluatorType,
        moy: this.evaluationRange,
        feedBack: this.description,
        user: {
          id: this.userId.toString()
        }
      };
  
      this.evaluationService.addEvaluation(evaluationData).subscribe(
        (response: any) => {
          console.log('Evaluation added successfully:', response);
          // Reset form fields
          this.userId = null;
          this.evaluationRange = null;
          this.description = '';
          this.evaluatorType = '';
        },
        error => {
          console.error('Error adding evaluation:', error);
        }
      );
    }

    fetchAverageRating(userId: number) {
      this.http.get<number>('http://localhost:8082/api/evaluation/get-average-evaluation/' + userId).subscribe(
        (rating: number) => {
          this.averageRating = rating;
        },
        error => {
          console.error('Error fetching average rating:', error);
        }
      );
    }
    convertToHours(durationMs: number): string {
      const hours = Math.floor(durationMs / 3600000); // Convert milliseconds to hours
      const minutes = Math.floor((durationMs % 3600000) / 60000); // Calculate remaining minutes
      return `${hours} hours ${minutes} minutes`;
    }
    loadCandidatPhoto(id: number): void {
      this.userService.getCandidatPhoto(id).subscribe(data => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          this.photoUrl = reader.result;
        }, false);
  
        if (data) {
          reader.readAsDataURL(data);
        }
      }, error => {
        console.log('Erreur lors de la récupération de l\'image:', error);
      });
    }
  }
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-signupentreprise',
    templateUrl: './signupentreprise.component.html',
    styleUrls: ['./signupentreprise.component.scss']
})
export class SignupEntrpriseComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    focus2;
    agreePrivacy: boolean = false;
    user = {
      username: '',
      email: '',
      password: '',
      address :'',
      
    };
  
    constructor(private authService: AuthService, private router: Router) { }
    ngOnInit() {}
    onSubmit(signupForm: NgForm) {
        if (signupForm.valid && this.agreePrivacy) {
          const user = {
            name: this.user.username,
            username:  this.user.username, 
            email: this.user.email,
            password: this.user.password,
            blocked: false, 
            address: this.user.address, 
            valid: false ,
            role: [{
              id: 2,
              name: 'ROLE_Entreprise',

            }]

          };
      
          this.authService.signupEntreprise(user).subscribe(
            (response) => {
              console.log('User registered successfully!');
              if (response && response.jwtToken) {
                const token = response.jwtToken;
                localStorage.setItem('token', token);
              }
              alert('check your mail account for verification !');
              this.router.navigate(['/']);

            },
            (error) => {
              console.error('Error during registration.', error);
              alert('check your mail account for verification !');
            }
          );
        } else {
          console.log('Form is invalid or Privacy Policy not agreed.');
        }
      }
}

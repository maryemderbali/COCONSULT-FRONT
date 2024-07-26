import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, AbstractControl, ValidationErrors } from '@angular/forms';
import { AccountService } from '../_services';
import { User } from '../_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {

  passwordError: string | null = null;
  forgetPassForm: FormGroup;
  token: string | undefined;
  user: User | null;
  isconn: any;
  username:String;
  constructor(private acountservice: AccountService, private router: Router) {
    this.token = undefined;
    this.isconn = this.acountservice.getIsConnected()
    console.error('isconnnnn' + this.isconn)
   
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }

  ngOnInit(): void {
    this.forgetPassForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      recaptcha: new FormControl(null, [Validators.required])
    }, this.passwordMatchValidator);
    this.acountservice.user.subscribe(user => {
      this.user = user;
      if (user) {
        this.username = user.username;
        console.info('Username:', this.username); 
      }
    });
  }
  

  
  public send(): void {
    if (this.forgetPassForm.valid) {
    //  if (this.forgetPassForm.value.newPassword === this.forgetPassForm.value.confirmPassword) {
         // Extract form data
      const formData = {
        oldPassword: this.forgetPassForm.value.oldPassword,
        newPassword: this.forgetPassForm.value.newPassword,
        
      };
     // const userId = this.acountservice.userValue.id;
      this.acountservice.forgetPassword(this.username, formData).subscribe((res) => {
       alert ( "changed pass");
        console.debug(`Token [${this.token}] generated`);
        //this.router.navigate(['/signin']);
      },
        (error) => alert("not changed")
      );
        this.passwordError = null;
       }
       else {
      //  this.passwordError = 'New Password and Confirm Password do not match';
      //  alert("New Password and Confirm Password do not match")
     // }
      console.error("form is invalide ",this.token);
      alert("modepasse is invalide")

    }
    
 }

}

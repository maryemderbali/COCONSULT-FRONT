import { Component, ViewChild,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OTPSERVICE } from '../_services/OTP.service';
import {OTP}from '../_models/OTP'
import Swal from 'sweetalert2';
//import { error } from 'console';
/*@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {
  constructor(private router: Router,otpservice:OTPSERVICE) { }

  test : Date = new Date();

  title = 'otp-app';

  otp!: string;
  inputDigitLeft: string = "Verify code";
  btnStatus: string = "btn-light";

  public configOptions = {
    length: 6,
    inputClass: 'digit-otp',
    containerClass: 'd-flex justify-content-between'
  }
  
  ngOnInit() {
    const newotp: OTP = OTPSERVICE.generateOTP();

      
  }
  onOtpChange(event: any) {
    this.otp = event;
    if(this.otp.length < this.configOptions.length) {
      this.inputDigitLeft = this.configOptions.length - this.otp.length + " digits Left";
      this.btnStatus = 'btn-light';
    }

    if (this.otp.length === this.configOptions.length )  {
      if (this.otp === 'TN1122') { 
        this.inputDigitLeft = "Let's go!";
        this.btnStatus = 'btn-primary';
        
      } else {
        this.inputDigitLeft = "Invalid OTP"; 
        this.btnStatus = 'btn-danger'; 
      }
    }
  }
  isButtonClicked = false;
  onButtonClick() {
    if (this.inputDigitLeft = "Let's go!")
    this.isButtonClicked = true;
    this.router.navigate(['/signin']); 
  }
}
*/


@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {
  constructor(private router: Router, private otpservice: OTPSERVICE) { }
  email: string = localStorage.getItem('email') || '';
  test: Date = new Date();

  title = 'otp-app';
  newotp: OTP | undefined; 

  otp!: string;
  inputDigitLeft: string = "Verify code";
  btnStatus: string = "btn-light";

  public configOptions = {
    length: 6,
    inputClass: 'digit-otp',
    containerClass: 'd-flex justify-content-between'
  }
  
  ngOnInit() {
   /*this.otpservice.generateOTP().subscribe((newotp: OTP) => {
      this.newotp = newotp;

// Handle the received OTP here
console.log('Generated OTP:', newotp.identification);
// Now you can compare this OTP with the entered OTP

});*/
  }

  onOtpChange(event: any) {
    this.otp = event;
    if(this.otp.length < this.configOptions.length) {
      this.inputDigitLeft = this.configOptions.length - this.otp.length + " digits Left";
      this.btnStatus = 'btn-light';
    }

    if (this.otp.length === this.configOptions.length )  {
      
      this.otpservice.verifyOTP(this.otp).subscribe(result => {
        if (result==true) {
          //console.log(result);
          this.otpservice.userstatus(this.email, result).subscribe(resp => {
          this.inputDigitLeft = "Let's go!";
          this.btnStatus = 'btn-primary';
            
          } ,(error) => {
            console.error('Error while verifying OTP:', error);
            
          });
        }
         else {
          // Faire quelque chose si le résultat est faux
          this.inputDigitLeft = "Invalid OTP"; 
        this.btnStatus = 'btn-danger'; 
        }
          
      });
           
    }
  }

  isButtonClicked = false;
  onButtonClick() {
    if (this.inputDigitLeft === "Let's go!") {
      this.isButtonClicked = true;
      this.router.navigate(['/signin']); 
    }
  }
  resend() {
    this.otpservice.resendOTP(this.email).subscribe((newotp: OTP) => {
      this.newotp = newotp;
      console.log('Generated OTP:', newotp.identification);
      Swal.fire("check your mail again !");
    }, error => {
      console.error('Error while resending OTP:', error);
      Swal.fire("An error occurred while resending OTP. Please try again later .");
    }
    
    
    );
  }
}

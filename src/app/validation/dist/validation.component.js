"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ValidationComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
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
var ValidationComponent = /** @class */ (function () {
    function ValidationComponent(router, otpservice) {
        this.router = router;
        this.otpservice = otpservice;
        this.email = localStorage.getItem('email') || '';
        this.test = new Date();
        this.title = 'otp-app';
        this.inputDigitLeft = "Verify code";
        this.btnStatus = "btn-light";
        this.configOptions = {
            length: 6,
            inputClass: 'digit-otp',
            containerClass: 'd-flex justify-content-between'
        };
        this.isButtonClicked = false;
    }
    ValidationComponent.prototype.ngOnInit = function () {
        /*this.otpservice.generateOTP().subscribe((newotp: OTP) => {
           this.newotp = newotp;
     
     // Handle the received OTP here
     console.log('Generated OTP:', newotp.identification);
     // Now you can compare this OTP with the entered OTP
     
     });*/
    };
    ValidationComponent.prototype.onOtpChange = function (event) {
        var _this = this;
        this.otp = event;
        if (this.otp.length < this.configOptions.length) {
            this.inputDigitLeft = this.configOptions.length - this.otp.length + " digits Left";
            this.btnStatus = 'btn-light';
        }
        if (this.otp.length === this.configOptions.length) {
            this.otpservice.verifyOTP(this.otp).subscribe(function (result) {
                if (result == true) {
                    //console.log(result);
                    _this.otpservice.userstatus(_this.email, result).subscribe(function (resp) {
                        _this.inputDigitLeft = "Let's go!";
                        _this.btnStatus = 'btn-primary';
                    }, function (error) {
                        console.error('Error while verifying OTP:', error);
                    });
                }
                else {
                    // Faire quelque chose si le résultat est faux
                    _this.inputDigitLeft = "Invalid OTP";
                    _this.btnStatus = 'btn-danger';
                }
            });
        }
    };
    ValidationComponent.prototype.onButtonClick = function () {
        if (this.inputDigitLeft === "Let's go!") {
            this.isButtonClicked = true;
            this.router.navigate(['/signin']);
        }
    };
    ValidationComponent.prototype.resend = function () {
        var _this = this;
        this.otpservice.resendOTP(this.email).subscribe(function (newotp) {
            _this.newotp = newotp;
            console.log('Generated OTP:', newotp.identification);
            sweetalert2_1["default"].fire("check your mail again !");
        }, function (error) {
            console.error('Error while resending OTP:', error);
            sweetalert2_1["default"].fire("An error occurred while resending OTP. Please try again later .");
        });
    };
    ValidationComponent = __decorate([
        core_1.Component({
            selector: 'app-validation',
            templateUrl: './validation.component.html',
            styleUrls: ['./validation.component.css']
        })
    ], ValidationComponent);
    return ValidationComponent;
}());
exports.ValidationComponent = ValidationComponent;

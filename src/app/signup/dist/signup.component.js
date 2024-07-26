"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignupComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var SignupComponent = /** @class */ (function () {
    function SignupComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.test = new Date();
        this.focus = false;
        this.focus1 = false;
        this.focus2 = false;
        this.agreePrivacy = false;
        this.signupError = '';
        this.user = {
            name: '',
            username: '',
            email: '',
            password: '',
            address: '',
            Role: '',
            number: 0
        };
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.user = {
            name: '',
            username: '',
            email: '',
            password: '',
            address: '',
            Role: '',
            number: 0
        };
    };
    SignupComponent.prototype.onSubmit = function (signupForm) {
        var _this = this;
        if (signupForm.valid && this.agreePrivacy) {
            var user = {
                name: this.user.name,
                username: this.user.username,
                email: this.user.email,
                password: this.user.password,
                address: this.user.address,
                number: this.user.number
            };
            var roleName = this.user.Role;
            this.authService.register(user, roleName).subscribe(function (response) {
                localStorage.setItem('email', _this.user.email);
                console.log('User registered successfully!');
                sweetalert2_1["default"].fire({
                    title: "Open Your mail?",
                    text: "check your mail account for verification !",
                    icon: "success"
                });
                //alert('check your mail account for verification !');
                // this.router.navigate(['/verification']); 
            }, function (error) {
                console.error('Error during registration.', error);
                sweetalert2_1["default"].fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong! "
                });
                _this.signupError = 'Error during registration. Please try again.';
                // window.location.reload();
            });
        }
        else {
            console.log('Form is invalid or Privacy Policy not agreed.');
            //window.location.reload();
        }
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.scss']
        })
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;

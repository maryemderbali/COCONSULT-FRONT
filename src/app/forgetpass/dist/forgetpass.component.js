"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ForgetpassComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ForgetpassComponent = /** @class */ (function () {
    function ForgetpassComponent(acountservice, router) {
        this.acountservice = acountservice;
        this.router = router;
        this.passwordError = null;
        this.token = undefined;
        this.isconn = this.acountservice.getIsConnected();
        console.error('isconnnnn' + this.isconn);
    }
    ForgetpassComponent.prototype.passwordMatchValidator = function (control) {
        var newPassword = control.get('newPassword');
        var confirmPassword = control.get('confirmPassword');
        if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
            return { passwordMismatch: true };
        }
        return null;
    };
    ForgetpassComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.forgetPassForm = new forms_1.FormGroup({
            oldPassword: new forms_1.FormControl('', [forms_1.Validators.required]),
            newPassword: new forms_1.FormControl('', [forms_1.Validators.required]),
            confirmPassword: new forms_1.FormControl('', [forms_1.Validators.required]),
            recaptcha: new forms_1.FormControl(null, [forms_1.Validators.required])
        }, this.passwordMatchValidator);
        this.acountservice.user.subscribe(function (user) {
            _this.user = user;
            if (user) {
                _this.username = user.username;
                console.info('Username:', _this.username);
            }
        });
    };
    ForgetpassComponent.prototype.send = function () {
        var _this = this;
        if (this.forgetPassForm.valid) {
            //  if (this.forgetPassForm.value.newPassword === this.forgetPassForm.value.confirmPassword) {
            // Extract form data
            var formData = {
                oldPassword: this.forgetPassForm.value.oldPassword,
                newPassword: this.forgetPassForm.value.newPassword
            };
            // const userId = this.acountservice.userValue.id;
            this.acountservice.forgetPassword(this.username, formData).subscribe(function (res) {
                alert("changed pass");
                console.debug("Token [" + _this.token + "] generated");
                //this.router.navigate(['/signin']);
            }, function (error) { return alert("not changed"); });
            this.passwordError = null;
        }
        else {
            //  this.passwordError = 'New Password and Confirm Password do not match';
            //  alert("New Password and Confirm Password do not match")
            // }
            console.error("form is invalide ", this.token);
            alert("modepasse is invalide");
        }
    };
    ForgetpassComponent = __decorate([
        core_1.Component({
            selector: 'app-forgetpass',
            templateUrl: './forgetpass.component.html',
            styleUrls: ['./forgetpass.component.css']
        })
    ], ForgetpassComponent);
    return ForgetpassComponent;
}());
exports.ForgetpassComponent = ForgetpassComponent;

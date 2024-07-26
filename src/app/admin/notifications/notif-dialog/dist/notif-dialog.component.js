"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.NotifDialogComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var NotifDialogComponent = /** @class */ (function () {
    function NotifDialogComponent(dialogRef, data, notificationService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.notificationService = notificationService;
        this.notification = { title: '', message: '' };
        this.roles = ['Manager', 'HR', 'CRM', 'Consult', 'PM']; // Example roles, replace with actual roles
        this.selectedRoles = [];
    }
    NotifDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    NotifDialogComponent.prototype.sendNotification = function () {
        var _this = this;
        // const adminMsgId = this.data.id; 
        console.log('Dialog data:', this.data.id);
        var _a = this.notification, title = _a.title, message = _a.message;
        var roles = this.selectedRoles;
        this.notificationService.sendNotification(this.data.id, title, message, roles)
            .subscribe(function () {
            console.log('Notification sent successfully.');
            // Handle success if needed
            _this.dialogRef.close();
        }, function (error) {
            console.error('Error sending notification:', error);
            // Handle error if needed
        });
    };
    NotifDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-notif-dialog',
            templateUrl: './notif-dialog.component.html',
            styleUrls: ['./notif-dialog.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], NotifDialogComponent);
    return NotifDialogComponent;
}());
exports.NotifDialogComponent = NotifDialogComponent;

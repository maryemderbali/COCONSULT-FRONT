"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NotificationsComponent = void 0;
var core_1 = require("@angular/core");
var notif_dialog_component_1 = require("./notif-dialog/notif-dialog.component");
var NotificationsComponent = /** @class */ (function () {
    function NotificationsComponent(dialog, notificationService) {
        this.dialog = dialog;
        this.notificationService = notificationService;
    }
    NotificationsComponent.prototype.ngOnInit = function () {
        this.getMessage();
    };
    NotificationsComponent.prototype.getMessage = function () {
        var _this = this;
        this.notificationService.getListMessage().subscribe(function (data) {
            _this.message = data;
            console.log(data);
        });
    };
    NotificationsComponent.prototype.formatDate = function (timestamp) {
        // Convert the Unix timestamp to a Date object
        var date = new Date(timestamp);
        // Format the date as desired (e.g., "YYYY-MM-DD HH:mm:ss")
        var formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0') + " " + date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0') + ":" + date.getSeconds().toString().padStart(2, '0');
        return formattedDate;
    };
    NotificationsComponent.prototype.sendNotification = function (message) {
        console.log('Sending notification:', message);
        var dialogRef = this.dialog.open(notif_dialog_component_1.NotifDialogComponent, {
            width: '500px',
            data: message
        });
        dialogRef.afterClosed().subscribe(function (result) {
            // Handle dialog close if needed
            console.log('The dialog was closed');
        });
    };
    NotificationsComponent = __decorate([
        core_1.Component({
            selector: 'app-notifications',
            templateUrl: './notifications.component.html',
            styleUrls: ['./notifications.component.css']
        })
    ], NotificationsComponent);
    return NotificationsComponent;
}());
exports.NotificationsComponent = NotificationsComponent;

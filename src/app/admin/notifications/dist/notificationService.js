"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.notificationService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var headers = { headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }) };
var notificationService = /** @class */ (function () {
    function notificationService(httpClient) {
        this.httpClient = httpClient;
        this.baseURL = "http://localhost:8082/Msg/getAll";
        this.env = "http://localhost:8082/Msg/sendNotification";
        this.url = "http://localhost:8082/Notification/getNotificationByuser";
    }
    notificationService.prototype.sendNotification = function (adminMsgId, title, message, recipients) {
        return this.httpClient.post(this.env + "/" + adminMsgId + "/" + title + "/" + message + "/" + recipients, null);
    };
    notificationService.prototype.getListMessage = function () {
        return this.httpClient.get(this.baseURL, headers);
    };
    notificationService.prototype.getNotificationByuser = function (userId) {
        return this.httpClient.get(this.url + "/" + userId, headers);
    };
    notificationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], notificationService);
    return notificationService;
}());
exports.notificationService = notificationService;

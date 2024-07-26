"use strict";
// pointage.service.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PointageService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var PointageService = /** @class */ (function () {
    function PointageService(http) {
        this.http = http;
        this.baseURL = 'http://localhost:8082/api/pointage'; // Adjust the URL as per your API
        this.isPointed = new rxjs_1.BehaviorSubject(true);
    }
    PointageService.prototype.recordPointage = function (userData) {
        return this.http.post(this.baseURL + "/add-pointage", userData);
    };
    PointageService.prototype.addUserPointage = function (userId) {
        var _this = this;
        if (!userId) {
            console.error('Invalid user ID');
            return rxjs_1.throwError(function () { return new Error('Invalid user ID'); });
        }
        return this.http.post(this.baseURL + "/users/" + userId + "/pointage/add", { userId: userId }).pipe(rxjs_1.tap(function (response) {
            _this.isPointed.next(true);
            //console.log(this.ispointed);
            return response;
        }), rxjs_1.catchError(function (error) {
            _this.isPointed.next(true);
            console.error('Error adding pointage:', error);
            return rxjs_1.throwError(function () { return error; });
        }));
    };
    PointageService.prototype.verifyReminder = function (userId, code) {
        var url = this.baseURL + "/verify-reminder/" + userId + "/" + code;
        return this.http.post(url, {});
    };
    PointageService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PointageService);
    return PointageService;
}());
exports.PointageService = PointageService;

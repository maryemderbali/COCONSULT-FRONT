"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListeUserAscService = void 0;
var core_1 = require("@angular/core");
var ListeUserAscService = /** @class */ (function () {
    function ListeUserAscService(http) {
        this.http = http;
        this.baseUserRole = "http://localhost:8081/api/user/by-role/asc/{roleName}";
    }
    ListeUserAscService.prototype.getListUserAsc = function () {
        return this.http.get("http://localhost:8081/api/user/list-Userco2/ASC");
    };
    ListeUserAscService.prototype.getUserByRoles = function (RolesName) {
        var url = "" + this.baseUserRole + RolesName;
        return this.http.get(url);
    };
    ListeUserAscService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ListeUserAscService);
    return ListeUserAscService;
}());
exports.ListeUserAscService = ListeUserAscService;

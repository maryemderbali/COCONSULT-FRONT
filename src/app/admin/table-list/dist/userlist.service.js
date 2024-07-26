"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserlistService = void 0;
var core_1 = require("@angular/core");
var UserlistService = /** @class */ (function () {
    function UserlistService(httpClient) {
        this.httpClient = httpClient;
        this.baseURL = "http://localhost:8082/api/user/list-user";
        this.baseURLactive = "http://localhost:8082/api/user/validate-user/";
        this.baseUserRole = "http://localhost:8082/api/user/list-RolesName/";
        this.baseBlockedUser = "http://localhost:8082/api/user/bloque-user/";
        this.basedebloquerBlockedUser = "http://localhost:8082/api/user/debloque-user/";
    }
    UserlistService.prototype.getUserList = function () {
        return this.httpClient.get(this.baseURL);
    };
    UserlistService.prototype.activateUser = function (id) {
        return this.httpClient.put(this.basedebloquerBlockedUser + id, id);
    };
    UserlistService.prototype.getUserByRoles = function (RolesName) {
        var url = "" + this.baseUserRole + RolesName;
        return this.httpClient.get(url);
    };
    UserlistService.prototype.bloquerUser = function (id) {
        return this.httpClient.put(this.baseBlockedUser + id, id);
    };
    UserlistService.prototype.debloqueruser = function (id) {
        return this.httpClient.put(this.basedebloquerBlockedUser + id, id);
    };
    UserlistService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserlistService);
    return UserlistService;
}());
exports.UserlistService = UserlistService;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserProfileComponent = void 0;
var core_1 = require("@angular/core");
var solution_1 = require("./solution");
var UserProfileComponent = /** @class */ (function () {
    function UserProfileComponent(solutionService) {
        this.solutionService = solutionService;
        this.solution = new solution_1.Solution();
    }
    UserProfileComponent.prototype.ngOnInit = function () {
    };
    UserProfileComponent.prototype.saveSolution = function () {
        this.solutionService.createSolution(this.solution).subscribe(function (data) {
            console.log(data);
            window.location.reload();
        }, function (error) { return console.log(error); });
    };
    UserProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-user-profile',
            templateUrl: './user-profile.component.html',
            styleUrls: ['./user-profile.component.css']
        })
    ], UserProfileComponent);
    return UserProfileComponent;
}());
exports.UserProfileComponent = UserProfileComponent;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SettingsComponent = void 0;
var core_1 = require("@angular/core");
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(listeUserAscService) {
        this.listeUserAscService = listeUserAscService;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        //this.getUserAsc();
        this.getUsersByRole();
    };
    SettingsComponent.prototype.getUsersByRole = function () {
        if (this.role === 'ROLE_Entreprise') {
            this.getEntrepriseAsc();
        }
        else if (this.role === 'ROLE_Employee') {
            this.getEmlpoyesAsc();
        }
    };
    SettingsComponent.prototype.getEntrepriseAsc = function () {
        var _this = this;
        this.listeUserAscService.getUserByRoles('ROLE_Entreprise').subscribe(function (data) {
            _this.emlpoyesAsc = data;
        });
    };
    SettingsComponent.prototype.getEmlpoyesAsc = function () {
        var _this = this;
        this.listeUserAscService.getUserByRoles('ROLE_Employee').subscribe(function (data) {
            _this.entrepriseAsc = data;
        });
    };
    SettingsComponent.prototype.getUserAsc = function () {
        var _this = this;
        this.listeUserAscService.getListUserAsc().subscribe(function (response) {
            console.log('Received data from the API:', response);
            _this.user = response;
        }, function (error) {
            console.error('Error fetching data from the API:', error);
        });
    };
    SettingsComponent = __decorate([
        core_1.Component({
            selector: 'app-settings',
            templateUrl: './settings.component.html',
            styleUrls: ['./settings.component.css']
        })
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;

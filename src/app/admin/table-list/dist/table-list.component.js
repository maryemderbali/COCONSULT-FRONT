"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TableListComponent = void 0;
var core_1 = require("@angular/core");
var TableListComponent = /** @class */ (function () {
    function TableListComponent(UserlistService, GroupChatservice) {
        this.UserlistService = UserlistService;
        this.GroupChatservice = GroupChatservice;
    }
    TableListComponent.prototype.ngOnInit = function () {
        //this.getUser();
        // this.getEmlpoyes();
        // this.getEntreprise();
        this.getAllUsers();
    };
    TableListComponent.prototype.getAllUsers = function () {
        var _this = this;
        this.UserlistService.getUserList().subscribe(function (data) {
            _this.users = data;
        });
    };
    TableListComponent.prototype.getUser = function () {
        var _this = this;
        this.UserlistService.getUserList().subscribe(function (data) {
            _this.users = data;
        });
    };
    TableListComponent.prototype.getEmlpoyes = function () {
        var _this = this;
        this.UserlistService.getUserByRoles('ROLE_Employee').subscribe(function (data) {
            _this.emlpoyes = data;
        });
    };
    TableListComponent.prototype.getEntreprise = function () {
        var _this = this;
        this.UserlistService.getUserByRoles('ROLE_Entreprise').subscribe(function (data) {
            _this.admins = data;
        });
    };
    TableListComponent.prototype.activateUser = function (user) {
        var _this = this;
        this.UserlistService.activateUser(user.id).subscribe(function () {
            console.log('Utilisateur activé avec succès.');
            _this.getAllUsers();
            // user.valid=true;
            // Faire quelque chose après l'activation réussie
        }, function (error) {
            console.error('Une erreur s\'est produite lors de l\'activation :', error);
            // Gérer l'erreur d'activation
        });
    };
    TableListComponent.prototype.bloqueUser = function (user) {
        var _this = this;
        this.UserlistService.bloquerUser(user.id).subscribe(function () {
            console.log('Utilisateur activé avec succès.');
            _this.getAllUsers();
            // user.valid=true;
            // Faire quelque chose après l'activation réussie
        }, function (error) {
            console.error('Une erreur s\'est produite lors de l\'activation :', error);
            // Gérer l'erreur d'activation
        });
    };
    TableListComponent.prototype.Ban = function (user) {
        var _this = this;
        this.GroupChatservice.bannedUser(user.id).subscribe(function () {
            console.log('Utilisateur activé avec succès.');
            _this.getAllUsers();
            // user.valid=true;
            // Faire quelque chose après l'activation réussie
        }, function (error) {
            console.error('Une erreur s\'est produite lors de l\'activation :', error);
            // Gérer l'erreur d'activation
        });
    };
    TableListComponent.prototype.removeBan = function (user) {
        var _this = this;
        this.GroupChatservice.removeBan(user.id).subscribe(function () {
            console.log('Utilisateur activé avec succès.');
            _this.getAllUsers();
            // user.valid=true;
            // Faire quelque chose après l'activation réussie
        }, function (error) {
            console.error('Une erreur s\'est produite lors de l\'activation :', error);
            // Gérer l'erreur d'activation
        });
    };
    TableListComponent = __decorate([
        core_1.Component({
            selector: 'app-table-list',
            templateUrl: './table-list.component.html',
            styleUrls: ['./table-list.component.css']
        })
    ], TableListComponent);
    return TableListComponent;
}());
exports.TableListComponent = TableListComponent;

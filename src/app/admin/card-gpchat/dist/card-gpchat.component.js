"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CardGPCHATComponent = void 0;
var core_1 = require("@angular/core");
var CardGPCHATComponent = /** @class */ (function () {
    function CardGPCHATComponent(GroupChatservice, GroupChatComponent) {
        this.GroupChatservice = GroupChatservice;
        this.GroupChatComponent = GroupChatComponent;
        this.cardContent = '';
        this.cardTitle = '';
        this.cardrole = '';
    }
    CardGPCHATComponent.prototype.ngOnInit = function () {
    };
    CardGPCHATComponent.prototype.determineCardClass = function () {
        if (this.cardrole === 'HR') {
            return '1';
        }
        else if (this.cardrole === 'PM') {
            return '2';
        }
        else if (this.cardrole === 'Employee') {
            return '3';
        }
        else if (this.cardrole === 'Manager') {
            return '1';
        }
        else if (this.cardrole === 'Consult') {
            return '2';
        }
    };
    CardGPCHATComponent.prototype["delete"] = function (idGPCHAT) {
        this.GroupChatComponent["delete"](idGPCHAT);
    };
    CardGPCHATComponent.prototype.openUpdateDialog = function (GroupChat) {
        this.GroupChatComponent.openUpdateDialog(GroupChat);
        console.log(GroupChat);
    };
    __decorate([
        core_1.Input()
    ], CardGPCHATComponent.prototype, "cardContent");
    __decorate([
        core_1.Input()
    ], CardGPCHATComponent.prototype, "cardTitle");
    __decorate([
        core_1.Input()
    ], CardGPCHATComponent.prototype, "cardrole");
    __decorate([
        core_1.Input()
    ], CardGPCHATComponent.prototype, "idGPCHAT");
    __decorate([
        core_1.Input()
    ], CardGPCHATComponent.prototype, "GroupChat");
    CardGPCHATComponent = __decorate([
        core_1.Component({
            selector: 'app-card-gpchat',
            templateUrl: './card-gpchat.component.html',
            styleUrls: ['./card-gpchat.component.css']
        })
    ], CardGPCHATComponent);
    return CardGPCHATComponent;
}());
exports.CardGPCHATComponent = CardGPCHATComponent;

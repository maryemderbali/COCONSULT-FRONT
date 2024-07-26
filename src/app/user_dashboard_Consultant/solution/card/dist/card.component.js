"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CardComponent = void 0;
var core_1 = require("@angular/core");
var CardComponent = /** @class */ (function () {
    function CardComponent() {
        this.cardContent = '';
        this.cardTitle = '';
    }
    CardComponent.prototype.ngOnInit = function () {
    };
    CardComponent.prototype.determineCardClass = function () {
        if (this.cardTitle === 'HR') {
            return '1';
        }
        else if (this.cardTitle === 'PM') {
            return '2';
        }
        else if (this.cardTitle === 'Employee') {
            return '3';
        }
        else if (this.cardTitle === 'Manager') {
            return '1';
        }
        else if (this.cardTitle === 'Consult') {
            return '2';
        }
    };
    __decorate([
        core_1.Input()
    ], CardComponent.prototype, "cardContent");
    __decorate([
        core_1.Input()
    ], CardComponent.prototype, "cardTitle");
    CardComponent = __decorate([
        core_1.Component({
            selector: 'app-card',
            templateUrl: './card.component.html',
            styleUrls: ['./card.component.css']
        })
    ], CardComponent);
    return CardComponent;
}());
exports.CardComponent = CardComponent;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VerticalNavBarComponent = exports.ROUTES = void 0;
var core_1 = require("@angular/core");
var icons_1 = require("ionicons/icons");
exports.ROUTES = [
    { path: '/user_dashboard_employe/monprofil', title: 'mon-profile', icon: 'person', "class": '' },
    { path: '/user_dashboard_employe/solutions', title: 'solutions', icon: 'dashboard', "class": '' },
    { path: '/user_dashboard_employe/settings', title: 'settings&Infos', icon: 'dashboard', "class": '' },
    { path: '/user_dashboard_employe/ticketlist', title: 'ticketlist', icon: 'dashboard', "class": '' },
    { path: '/user_dashboard_employe/MeetingsListe', title: 'MeetingsListe', icon: 'dashboard', "class": '' },
    { path: '/user_dashboard_employe/Activityuse', title: 'Activity', icon: 'dashboard', "class": '' },
];
var VerticalNavBarComponent = /** @class */ (function () {
    function VerticalNavBarComponent() {
        this.barChartOutline = icons_1.barChartOutline;
        this.appsOutline = icons_1.appsOutline;
        this.bulbOutline = icons_1.bulbOutline;
        this.callOutline = icons_1.callOutline;
        this.settingsOutline = icons_1.settingsOutline;
        this.videocam = icons_1.videocam;
    }
    VerticalNavBarComponent.prototype.ngOnInit = function () {
        this.menuItems = exports.ROUTES.filter(function (menuItem) { return menuItem; });
    };
    VerticalNavBarComponent.prototype.isMobileMenu = function () {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
    ;
    VerticalNavBarComponent = __decorate([
        core_1.Component({
            selector: 'app-vertical-nav-bar',
            templateUrl: './vertical-nav-bar.component.html',
            styleUrls: ['./vertical-nav-bar.component.css']
        })
    ], VerticalNavBarComponent);
    return VerticalNavBarComponent;
}());
exports.VerticalNavBarComponent = VerticalNavBarComponent;

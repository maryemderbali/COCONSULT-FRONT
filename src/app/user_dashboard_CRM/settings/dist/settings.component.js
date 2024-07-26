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
var add_update_activity_sales_team_component_1 = require("../add-update-activity-sales-team/add-update-activity-sales-team.component");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(_dialog, activityService, route) {
        this._dialog = _dialog;
        this.activityService = activityService;
        this.route = route;
        this.displayedColumns = ['repertoire', 'status', 'heureStart', 'heureEnd', 'description', 'typeAct', 'action'];
        this.dataSource = new table_1.MatTableDataSource();
        this.activitySalesTeamProspecting = [];
        this.activitySalesTeamNegotiation = [];
        this.activitySalesTeamClosing = [];
        this.selectedTab = '';
        this.repertoire = [];
    }
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getAllSalesActivities();
        this.route.fragment.subscribe(function (fragment) {
            _this.selectedTab = fragment || 'Prospecting';
            _this.loadActivitySalesTeamByClass(_this.selectedTab);
        });
    };
    SettingsComponent.prototype.openAddUpdateActivitySalesTeamForm = function () {
        var dialogRef = this._dialog.open(add_update_activity_sales_team_component_1.AddUpdateActivitySalesTeamComponent);
        dialogRef.afterClosed().subscribe(function (val) {
            if (val) {
                //this.loadActivitySalesTeamByClass();
                console.log('Success');
            }
        });
    };
    SettingsComponent.prototype.openEditForm = function (data) {
        var dialogRef = this._dialog.open(add_update_activity_sales_team_component_1.AddUpdateActivitySalesTeamComponent, {
            data: data
        });
        dialogRef.afterClosed().subscribe(function (formData) {
            if (formData) {
                // Add your logic here to handle the submitted form data
                console.log('Form data submitted:', formData);
            }
        });
    };
    SettingsComponent.prototype.deleteActivity = function (id) {
        var _this = this;
        this.activityService.deleteActivitySalesTeam(id).subscribe(function () {
            _this.getAllSalesActivities();
        });
    };
    SettingsComponent.prototype.getAllSalesActivities = function () {
        var _this = this;
        this.activityService.getAllActivitySalesTeam().subscribe(function (data) {
            _this.dataSource.data = data;
        });
    };
    SettingsComponent.prototype.loadActivitySalesTeamByClass = function (classSalesTeam) {
        var _this = this;
        this.activityService.getActivitySalesTeamByClass(classSalesTeam)
            .subscribe(function (data) {
            if (classSalesTeam === 'Prospecting') {
                _this.dataSource.data = _this.activitySalesTeamProspecting = data;
            }
            else if (classSalesTeam === 'Negotiation') {
                _this.dataSource.data = _this.activitySalesTeamNegotiation = data;
            }
            else if (classSalesTeam === 'Closing') {
                _this.dataSource.data = _this.activitySalesTeamClosing = data;
            }
        });
    };
    // Method to return the background color based on typeAct
    SettingsComponent.prototype.getTypeActColor = function (typeAct) {
        switch (typeAct) {
            case 'REUNION':
                return 'lightblue';
            case 'APPEL_TELEPHONIQUE':
                return 'lightgreen';
            case 'RESUME_APPEL':
                return 'lightcyan';
            case 'MEETING':
                return 'lightcoral';
            case 'CALL_SUMMARY':
                return 'lightsalmon'; // Or any other color you prefer
            default:
                return 'transparent'; // Default color if typeAct doesn't match any case
        }
    };
    // Method to return the background color based on status
    SettingsComponent.prototype.getStatusColor = function (status) {
        switch (status) {
            case 'DONE':
                return 'lightgreen';
            case 'WAITING':
                return 'lightsalmon';
            default:
                return 'transparent'; // Default color if status doesn't match any case
        }
    };
    SettingsComponent.prototype.openMail = function () {
        window.location.href = 'mailto:louay.sghaier@esprit.tn';
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], SettingsComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], SettingsComponent.prototype, "sort");
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

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AddUpdateActivitySalesTeamComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var ActivitySalesTeam_1 = require("src/app/_models/ActivitySalesTeam");
var AddUpdateActivitySalesTeamComponent = /** @class */ (function () {
    function AddUpdateActivitySalesTeamComponent(fb, salesActivityService, dialogRef, data, _repertoireService // Inject RepertoireService
    ) {
        this.fb = fb;
        this.salesActivityService = salesActivityService;
        this.dialogRef = dialogRef;
        this.data = data;
        this._repertoireService = _repertoireService;
        this.statusOptions = Object.values(ActivitySalesTeam_1.Status);
        this.typeOptions = Object.values(ActivitySalesTeam_1.TypeSalesActivity);
        this.repertoires = []; // Assuming Repertoire model and service are available
        this.activityForm = this.fb.group({
            heureStart: '',
            heureEnd: '',
            description: '',
            typeAct: '',
            status: '',
            repertoireId: '',
            classSalesTeam: ''
        });
    }
    AddUpdateActivitySalesTeamComponent.prototype.ngOnInit = function () {
        // Assuming you have a service method to fetch repertoires
        this.loadRepertoires();
        if (this.data) {
            this.activityForm.patchValue(this.data);
        }
    };
    // Assuming you have a service method to load repertoires
    AddUpdateActivitySalesTeamComponent.prototype.loadRepertoires = function () {
        var _this = this;
        this._repertoireService.GetAllRepertoire().subscribe(function (repertoires) {
            _this.repertoires = repertoires;
        });
    };
    AddUpdateActivitySalesTeamComponent.prototype.onFormSubmit = function () {
        var _this = this;
        if (this.activityForm.valid) {
            var formData = this.activityForm.value;
            var repertoireId = formData.repertoireId;
            delete formData.repertoireId; // Remove 'repertoireId' from form data before sending
            if (this.data) {
                formData.idActSale = this.data.idActSale;
                this.salesActivityService.updateActivitySalesTeam(formData).subscribe({
                    next: function () {
                        _this.dialogRef.close(true);
                    },
                    error: function (err) {
                        console.error(err);
                    }
                });
            }
            else {
                this.salesActivityService.addActivitySalesTeamAffectRep(formData, repertoireId).subscribe({
                    next: function () {
                        _this.dialogRef.close(true);
                    },
                    error: function (err) {
                        console.error(err);
                    }
                });
            }
        }
    };
    AddUpdateActivitySalesTeamComponent = __decorate([
        core_1.Component({
            selector: 'app-add-update-activity-sales-team',
            templateUrl: './add-update-activity-sales-team.component.html',
            styleUrls: ['./add-update-activity-sales-team.component.scss']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AddUpdateActivitySalesTeamComponent);
    return AddUpdateActivitySalesTeamComponent;
}());
exports.AddUpdateActivitySalesTeamComponent = AddUpdateActivitySalesTeamComponent;

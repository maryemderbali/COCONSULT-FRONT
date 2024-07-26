"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DemandeCongeComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var DemandeCongeComponent = /** @class */ (function () {
    function DemandeCongeComponent(demandeCongeService) {
        this.demandeCongeService = demandeCongeService;
        this.displayedColumns = ['user', 'duration', 'startDate', 'type', 'certificate', 'actions'];
    }
    DemandeCongeComponent.prototype.ngOnInit = function () {
        this.fetchDemandes();
    };
    DemandeCongeComponent.prototype.fetchDemandes = function () {
        var _this = this;
        this.demandeCongeService.getAllDemandes().subscribe(function (demandes) {
            _this.demandes = new table_1.MatTableDataSource(demandes);
            _this.demandes.paginator = _this.paginator;
        });
    };
    DemandeCongeComponent.prototype.downloadFile = function (demande) {
        var id = demande.id;
        var downloadUrl = "http://localhost:8082/api/demande-conge/demande-conge/" + id + "/certificate";
        // Open a new blank window with the download URL
        window.open(downloadUrl, '_blank');
    };
    DemandeCongeComponent.prototype.approveDemande = function (demande) {
        var _this = this;
        // Implement logic to approve the demand
        this.demandeCongeService.approveDemande(demande.id).subscribe(function (response) {
            console.log('Demande approved successfully:', response);
            _this.fetchDemandes(); // Fetch the updated list of demands
        }, function (error) {
            console.error('Error approving demand:', error);
        });
    };
    DemandeCongeComponent.prototype.declineDemande = function (demande) {
        var _this = this;
        // Implement logic to decline the demand
        this.demandeCongeService.deleteDemande(demande.id).subscribe(function (response) {
            console.log('Demande deleted successfully:', response);
            _this.fetchDemandes(); // Fetch the updated list of demands
        }, function (error) {
            console.error('Error deleting demand:', error);
        });
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], DemandeCongeComponent.prototype, "paginator");
    DemandeCongeComponent = __decorate([
        core_1.Component({
            templateUrl: './table.demande.component.html',
            styleUrls: ['./add-demande.component.css']
        })
    ], DemandeCongeComponent);
    return DemandeCongeComponent;
}());
exports.DemandeCongeComponent = DemandeCongeComponent;

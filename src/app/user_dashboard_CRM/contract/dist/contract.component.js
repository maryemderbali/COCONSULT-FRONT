"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContractComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var add_update_contract_component_1 = require("../add-update-contract/add-update-contract.component");
var EtapeContract_1 = require("src/app/_models/EtapeContract");
var ContractComponent = /** @class */ (function () {
    function ContractComponent(_dialog, _contractService, fileUploadService) {
        this._dialog = _dialog;
        this._contractService = _contractService;
        this.fileUploadService = fileUploadService;
        this.repertoire = [];
        this.contract = [];
        this.searchTerm = '';
        this.currentPage = 0;
        this.pageSize = 10;
        this.pagedContract = [];
        this.displayedColumns = ['referenceContract', 'repertoire', 'description', 'dateContract', 'montant', 'nbreTranche', 'etape', 'action'];
        this.dataSource = new table_1.MatTableDataSource([]); // Initialize with empty array
    }
    ContractComponent.prototype.ngOnInit = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getContractList();
        this.updatePage(); // Initialize pagination
    };
    ContractComponent.prototype.onPageChange = function (event) {
        this.currentPage = event.pageIndex;
        this.pageSize = event.pageSize;
        this.updatePage();
    };
    ContractComponent.prototype.updatePage = function () {
        //const filteredContract = this.filterContracts(this.searchTerm);
        var startIndex = this.currentPage * this.pageSize;
        //   this.pagedContract = filteredContract.slice(startIndex, startIndex + this.pageSize);
    };
    ContractComponent.prototype.openAddUpdateContractForm = function () {
        var _this = this;
        var dialogRef = this._dialog.open(add_update_contract_component_1.AddUpdateContractComponent);
        dialogRef.afterClosed().subscribe(function (val) {
            if (val) {
                _this.getContractList();
                console.log('Success');
            }
        });
    };
    ContractComponent.prototype.openPdf = function (description) {
        this.fileUploadService.getPdf(description).subscribe(function (pdfData) {
            var blob = new Blob([pdfData], { type: 'application/pdf' });
            var url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');
        }, function (error) {
            console.error('Failed to fetch PDF:', error);
        });
    };
    ContractComponent.prototype.getContractList = function () {
        var _this = this;
        this._contractService.getAllContracts().subscribe({
            next: function (contracts) {
                // Modify the description of each contract
                contracts.forEach(function (contract) {
                    // Extract filename from description
                    var filename = contract.description.split('\\').pop();
                    // Update contract description
                    contract.description = filename || contract.description;
                });
                // Assign contracts to dataSource
                _this.dataSource.data = contracts;
                // Update paginator length
                _this.dataSource.paginator.length = _this.dataSource.data.length;
            },
            error: console.error
        });
    };
    ContractComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        // Update the paginator's length
        this.dataSource.paginator.length = this.dataSource.filteredData.length;
        // Reset the paginator to the first page
        this.dataSource.paginator.firstPage();
    };
    ContractComponent.prototype.openEditForm = function (data) {
        var _this = this;
        var dialogRef = this._dialog.open(add_update_contract_component_1.AddUpdateContractComponent, {
            data: data
        });
        dialogRef.afterClosed().subscribe(function (val) {
            if (val) {
                _this.getContractList();
            }
        });
    };
    ContractComponent.prototype.deleteContract = function (contractId) {
        var _this = this;
        this._contractService.removeContract(contractId).subscribe({
            next: function (res) {
                _this.getContractList();
            },
            error: console.error
        });
    };
    ContractComponent.prototype.getTotalMontant = function () {
        if (!this.dataSource)
            return 0;
        return this.dataSource.data.map(function (contract) { return contract.montant; }).reduce(function (acc, value) { return acc + value; }, 0);
    };
    /* filterContracts(searchTerm: string): Contract[] {
       return this.contract.filter(contract =>
         contract.idContract.toString().includes(searchTerm) ||
         contract.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
         contract.dateContract.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
         contract.montant.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
         contract.nbreTranche.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
         this.getEtapeLabel(contract.etape).toLowerCase().includes(searchTerm.toLowerCase()) ||
         this.getRepertoireLabel(contract.repertoire).toLowerCase().includes(searchTerm.toLowerCase())
       );
     }*/
    ContractComponent.prototype.getEtapeLabel = function (etape) {
        switch (etape) {
            case EtapeContract_1.Etape.NOUVEAU:
                return 'Nouveau';
            case EtapeContract_1.Etape.DECOUVERTE:
                return 'Découverte';
            case EtapeContract_1.Etape.PROPSITION:
                return 'Proposition';
            case EtapeContract_1.Etape.NEGOCIATION:
                return 'Négociation';
            case EtapeContract_1.Etape.CONCLU:
                return 'Conclu';
            case EtapeContract_1.Etape.PERDU:
                return 'Perdu';
            default:
                return '';
        }
    };
    ContractComponent.prototype.getRepertoireLabel = function (repertoire) {
        return repertoire.contact; // Utilize the contact field directly
    };
    // Method to return the background color based on étape
    ContractComponent.prototype.getEtapeColor = function (etape) {
        switch (etape) {
            case 'NOUVEAU':
                return 'lightblue';
            case 'DECOUVERTE':
                return 'lightgreen';
            case 'PROPSITION':
                return 'lightyellow';
            case 'NEGOCIATION':
                return 'lightcoral';
            case 'CONCLU':
                return 'lightsalmon'; // Or any other color you prefer
            case 'PERDU':
                return 'lightpink'; // Or any other color you prefer
            default:
                return 'transparent'; // Default color if étape doesn't match any case
        }
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], ContractComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], ContractComponent.prototype, "sort");
    ContractComponent = __decorate([
        core_1.Component({
            selector: 'app-contract',
            templateUrl: './contract.component.html',
            styleUrls: ['./contract.component.scss']
        })
    ], ContractComponent);
    return ContractComponent;
}());
exports.ContractComponent = ContractComponent;

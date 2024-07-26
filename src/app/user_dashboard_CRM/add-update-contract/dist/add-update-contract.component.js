"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.AddUpdateContractComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var AddUpdateContractComponent = /** @class */ (function () {
    function AddUpdateContractComponent(_fb, _contractService, fileUploadService, router, _dialogRef, data, _coreService, _repertoireService // Inject RepertoireService
    ) {
        this._fb = _fb;
        this._contractService = _contractService;
        this.fileUploadService = fileUploadService;
        this.router = router;
        this._dialogRef = _dialogRef;
        this.data = data;
        this._coreService = _coreService;
        this._repertoireService = _repertoireService;
        this.selectedFile = null;
        this.repertoires = []; // Property to hold the list of repertoires
        this.contractForm = this._fb.group({
            repertoireId: '',
            description: '',
            dateContract: '',
            montant: '',
            nbreTranche: '',
            etape: ''
        });
    }
    AddUpdateContractComponent.prototype.ngOnInit = function () {
        this.loadRepertoires(); // Load repertoires when component initializes
        this.contractForm.patchValue(this.data);
    };
    AddUpdateContractComponent.prototype.onFileSelected = function (event) {
        this.selectedFile = event.target.files[0];
    };
    AddUpdateContractComponent.prototype.uploadFile = function (idContract, file) {
        this.fileUploadService.uploadFile(idContract, file)
            .subscribe(function (response) {
            console.log('File uploaded successfully:', response);
            // Optionally reset the form after successful upload
            // this.contractForm.reset();
        }, function (error) {
            console.error('Failed to upload file:', error);
        });
    };
    AddUpdateContractComponent.prototype.loadRepertoires = function () {
        var _this = this;
        this._repertoireService.GetAllRepertoire().subscribe(function (repertoires) {
            _this.repertoires = repertoires;
        });
    };
    AddUpdateContractComponent.prototype.onFormSubmit = function () {
        var _this = this;
        if (this.contractForm.valid) {
            var formData = __assign({}, this.contractForm.value);
            delete formData.repertoireId;
            var repertoireId = this.contractForm.get("repertoireId").value;
            console.log('Contract Data:', formData);
            console.log('Repertoire ID:', repertoireId);
            if (this.data) {
                formData.idContract = this.data.idContract;
                this._contractService.updateContract(formData).subscribe({
                    next: function () {
                        _this._dialogRef.close(true);
                    },
                    error: function (err) {
                        console.error(err);
                    }
                });
            }
            else {
                formData.repertoireContact = null; // Clear repertoireContact field as it will be set automatically
                this._contractService.addContractAffectRepAndGeneratePdf(formData, repertoireId).subscribe({
                    next: function (pdfBlob) {
                        var pdfUrl = URL.createObjectURL(pdfBlob);
                        window.open(pdfUrl, '_blank');
                        _this._dialogRef.close(true);
                    },
                    error: function (err) {
                        console.error(err);
                    }
                });
            }
        }
    };
    AddUpdateContractComponent = __decorate([
        core_1.Component({
            selector: 'app-add-update-contract',
            templateUrl: './add-update-contract.component.html',
            styleUrls: ['./add-update-contract.component.scss']
        }),
        __param(5, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AddUpdateContractComponent);
    return AddUpdateContractComponent;
}());
exports.AddUpdateContractComponent = AddUpdateContractComponent;

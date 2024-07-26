"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DemandeService = void 0;
var core_1 = require("@angular/core");
var DemandeService = /** @class */ (function () {
    function DemandeService(http) {
        this.http = http;
        this.apiUrl = "http://localhost:8082/api";
    }
    DemandeService.prototype.addAsk = function (formData) {
        return this.http.post(this.apiUrl + "/demande-conge/add-demande-conge", formData);
    };
    DemandeService.prototype.getAllDemandes = function () {
        return this.http.get(this.apiUrl + "/demande-conge/");
    };
    DemandeService.prototype.deleteDemande = function (id) {
        return this.http["delete"](this.apiUrl + "/demande-conge/delete-demande-conge/" + id);
    };
    DemandeService.prototype.approveDemande = function (id) {
        return this.http.post(this.apiUrl + "/demande-conge/approve-demande-conge/" + id, {});
    };
    DemandeService.prototype.downloadFile = function (id) {
        // Define the endpoint URL to download the file
        var url = this.apiUrl + "/demande-conge/demande-conge/" + id + "/certificate";
        // Make a request to download the file
        return this.http.get(url, {
            responseType: 'blob' // Set the response type to 'blob' to handle binary data
        });
    };
    DemandeService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DemandeService);
    return DemandeService;
}());
exports.DemandeService = DemandeService;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContractService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ContractService = /** @class */ (function () {
    function ContractService(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:8082/Contract'; // Update with your Spring Boot API URL
    }
    ContractService.prototype.getAllContracts = function () {
        return this.http.get(this.baseUrl + "/GetAllContract");
    };
    ContractService.prototype.addContract = function (contract) {
        return this.http.post(this.baseUrl + "/ajouterContract", contract);
    };
    ContractService.prototype.addContractAffectRep = function (contract, repertoireId) {
        var url = this.baseUrl + "/ajouterContract/" + repertoireId;
        return this.http.post(url, contract).pipe(operators_1.catchError(function (error) {
            throw 'Error while adding contract: ' + error;
        }));
    };
    ContractService.prototype.addContractAffectRepAndGeneratePdf = function (contract, repertoireId) {
        var url = this.baseUrl + "/addContractAndGeneratePdf/" + repertoireId;
        return this.http.post(url, contract, { responseType: 'blob' }).pipe(operators_1.catchError(function (error) {
            return rxjs_1.throwError('Error while adding contract and generating PDF: ' + error);
        }));
    };
    ContractService.prototype.updateContractAffectREpo = function (contractId, repertoireId, updatedContract) {
        return this.http.put(this.baseUrl + "/updateContractAffectRepo/" + contractId + "/repertoire/" + repertoireId, updatedContract);
    };
    ContractService.prototype.getContract = function (contractId) {
        return this.http.get(this.baseUrl + "/GetContract/" + contractId);
    };
    ContractService.prototype.getRepertoireContactByContractId = function (idContract) {
        return this.http.get(this.baseUrl + "/" + idContract + "/repertoireContact");
    };
    ContractService.prototype.updateContract = function (updatedContract) {
        var id = updatedContract.idContract; // Assuming idContract is the correct property name
        return this.http.put(this.baseUrl + "/updateContract/" + id, updatedContract);
    };
    ContractService.prototype.removeContract = function (id) {
        return this.http["delete"](this.baseUrl + "/RemoveContract/" + id);
    };
    ContractService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ContractService);
    return ContractService;
}());
exports.ContractService = ContractService;

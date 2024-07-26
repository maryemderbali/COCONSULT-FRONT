"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddAskComponent = void 0;
var core_1 = require("@angular/core");
var AddAskComponent = /** @class */ (function () {
    function AddAskComponent(askService) {
        this.askService = askService;
    }
    AddAskComponent.prototype.submitForm = function () {
        var _this = this;
        // Convert the file to a base64 string
        this.convertFileToBase64(this.certificateFile).then(function (base64String) {
            // Create the JSON payload including the base64 string of the file
            var requestBody = {
                duration: _this.duration.toString(),
                startDate: _this.startDate,
                user: _this.userId.toString(),
                type: _this.type,
                certificateFile: base64String // Include the base64 string of the file
            };
            // Send the JSON payload to the backend
            _this.askService.addAsk(requestBody).subscribe(function (response) {
                console.log('Ask added successfully:', response);
                // Optionally, perform any additional actions after adding the ask
                _this.resetForm();
            }, function (error) {
                console.error('Error adding ask:', error);
            });
        })["catch"](function (error) {
            console.error('Error converting file to base64:', error);
        });
    };
    // Function to convert a file to a base64 string
    AddAskComponent.prototype.convertFileToBase64 = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                var _a;
                var base64String = (_a = reader.result) === null || _a === void 0 ? void 0 : _a.toString().split(',')[1]; // Extract base64 string
                resolve(base64String);
            };
            reader.onerror = function (error) { return reject(error); };
        });
    };
    AddAskComponent.prototype.resetForm = function () {
        this.duration = null;
        this.startDate = null;
        this.userId = null;
        this.type = null;
        this.certificateFile = null;
    };
    AddAskComponent.prototype.onFileSelected = function (event) {
        this.certificateFile = event.target.files[0];
    };
    AddAskComponent = __decorate([
        core_1.Component({
            selector: 'app-add-demande',
            templateUrl: './add-demande.component.html',
            styleUrls: ['./add-demande.component.css']
        })
    ], AddAskComponent);
    return AddAskComponent;
}());
exports.AddAskComponent = AddAskComponent;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ErrorInterceptor = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var sweetalert2_1 = require("sweetalert2");
var ErrorInterceptor = /** @class */ (function () {
    function ErrorInterceptor(accountService) {
        this.accountService = accountService;
    }
    ErrorInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        return next.handle(request).pipe(operators_1.catchError(function (err) {
            if (err instanceof http_1.HttpErrorResponse && (err.status === 401 || err.status === 403)) {
                console.error('ErrorInterceptor', err);
                // Check if the error response indicates an expired token
                if (err.error && err.error.message === 'Token expired') {
                    // Call refreshToken method
                    return _this.accountService.refreshToken().pipe(operators_1.switchMap(function (res) {
                        console.info('Token refreshed', res);
                        var user = _this.accountService.userValue;
                        // Update the user object with new tokens
                        user.token = res.newAccessToken;
                        user.refreshToken = res.refreshToken;
                        request = request.clone({
                            setHeaders: {
                                'Content-Type': 'application/json',
                                Authorization: "access " + user.token,
                                'RefreshToken': user.refreshToken
                            }
                        });
                        _this.accountService.userSubject.next(user);
                        //localStorage.setItem('user', JSON.stringify(user));
                        // Retry the original request with the new token
                        return next.handle(request);
                    }), operators_1.catchError(function () {
                        // Logout if refreshToken fails
                        console.error('Token refresh failed');
                        sweetalert2_1["default"].fire({
                            icon: "error",
                            title: "Oops...",
                            text: "You session is expired on  this page (Token refresh failed)!"
                        });
                        _this.accountService.logout();
                        return rxjs_1.throwError(function () { return 'Token refresh failed'; });
                    }));
                }
                else {
                    sweetalert2_1["default"].fire({
                        icon: "error",
                        title: "Oops...",
                        text: "You Have no right to do anything here please contact the supervisors !"
                    });
                    // Logout user for other 401 or 403 errors
                    //alert('You session is expired on  this page');
                    // this.accountService.logout();
                }
            }
            // Pass the error through if it's not a 401 or 403 error
            return rxjs_1.throwError(function () { return err; });
        }));
    };
    ErrorInterceptor = __decorate([
        core_1.Injectable()
    ], ErrorInterceptor);
    return ErrorInterceptor;
}());
exports.ErrorInterceptor = ErrorInterceptor;

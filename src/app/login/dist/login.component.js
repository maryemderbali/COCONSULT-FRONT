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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var angularx_social_login_1 = require("@abacritt/angularx-social-login");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(socialAuthService, authService, router, oauthservice, tokenService, httpClient) {
        this.socialAuthService = socialAuthService;
        this.authService = authService;
        this.router = router;
        this.oauthservice = oauthservice;
        this.tokenService = tokenService;
        this.httpClient = httpClient;
        this.loginError = '';
        this.rememberMe = false;
        this.accessToken = '';
        this.user = {
            email: '',
            password: ''
        };
    }
    //google login
    LoginComponent.prototype.getAccessToken = function () {
        var _this = this;
        this.socialAuthService.getAccessToken(angularx_social_login_1.GoogleLoginProvider.PROVIDER_ID).then(function (accessToken) { return _this.accessToken = accessToken; });
    };
    LoginComponent.prototype.getGoogleCalendarData = function () {
        if (!this.accessToken)
            return;
        this.httpClient
            .get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            headers: { Authorization: "Bearer " + this.accessToken }
        })
            .subscribe(function (events) {
            alert('Look at your console');
            console.log('events', events);
        });
    };
    LoginComponent.prototype.refreshToken = function () {
        this.socialAuthService.refreshAuthToken(angularx_social_login_1.GoogleLoginProvider.PROVIDER_ID);
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.loginAlert();
        this.signInWithGoogle();
    };
    LoginComponent.prototype.loginAlert = function () {
        sweetalert2_1["default"].fire({
            title: "Welcome,Please Read this Instructions ",
            text: "If you see Google-Login-Popup skape this alert and Join Us ! if you could not login with google account please enable third part login from your browser setting ! or try to register ",
            icon: "warning"
        });
    };
    LoginComponent.prototype.signInWithGoogle = function () {
        var _this = this;
        this.socialAuthService.authState.subscribe(function (user) {
            _this.socialUser = user;
            _this.tokenService.setToken(user.idToken);
            localStorage.setItem('socialuser', JSON.stringify(user));
            console.log(user);
            _this.TokenDto = {
                value: user.idToken
            };
            _this.authService.google(_this.TokenDto).subscribe(function (res) {
                if (res.authorities[0].authority === 'ROLE_USER') {
                    sweetalert2_1["default"].fire({
                        title: "Pick up your role",
                        input: "select",
                        inputOptions: {
                            'Employee': 'Employee',
                            'Manager': 'Manager',
                            'HR': 'HR',
                            'CRM': 'CRM',
                            'Consult': 'Consult',
                            'PM': 'PM'
                        },
                        inputAttributes: {
                            autocapitalize: "off"
                        },
                        showCancelButton: true,
                        confirmButtonText: "Update !",
                        showLoaderOnConfirm: true,
                        preConfirm: function (role) { return __awaiter(_this, void 0, void 0, function () {
                            var backendapiUrl, response, _a, error_1;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 4, , 5]);
                                        backendapiUrl = "http://localhost:8082/api/role/updateuserrole/" + role + "/" + res.id;
                                        return [4 /*yield*/, fetch(backendapiUrl, {
                                                method: 'PUT'
                                            })];
                                    case 1:
                                        response = _b.sent();
                                        if (!!response.ok) return [3 /*break*/, 3];
                                        _a = Error.bind;
                                        return [4 /*yield*/, response.text()];
                                    case 2: throw new (_a.apply(Error, [void 0, _b.sent()]))();
                                    case 3: return [2 /*return*/, true]; // Indicates successful request
                                    case 4:
                                        error_1 = _b.sent();
                                        sweetalert2_1["default"].showValidationMessage("\n                  Request failed: " + error_1 + "\n                ");
                                        return [3 /*break*/, 5];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); },
                        allowOutsideClick: function () { return !sweetalert2_1["default"].isLoading(); }
                    }).then(function (result) {
                        if (result.isConfirmed) {
                            sweetalert2_1["default"].fire({
                                icon: "success",
                                html: "\n                  \n                  <a href=\"#\">visit your profile</a>\n                  \n                "
                            });
                        }
                    });
                }
                sessionStorage.setItem('user', JSON.stringify(res));
                // Otherwise, store tokens in sessionStorage
                // sessionStorage.setItem('accessToken', accessToken);
                //sessionStorage.setItem('refreshToken', refreshToken);
                // this.tokenService.setToken(res.value);
                //this.authService.isconn= true;
                //this.router.navigate(['/']);
            }, function (err) {
                console.log(err);
                sweetalert2_1["default"].fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!"
                });
                //this.socialAuthService.signOut();
            });
            _this.router.navigate(['/']);
            //window.location.reload();
            _this.loggedIn = (user != null);
        });
    };
    ;
    LoginComponent.prototype.onRememberMeChange = function () {
        // This method is called when the value of the "Remember me" checkbox changes
        console.info('Remember me value changed:', this.rememberMe);
    };
    LoginComponent.prototype.onSubmit = function (loginForm) {
        var _this = this;
        if (loginForm.valid) {
            var email = this.user.email;
            var password = this.user.password;
            this.authService.login(email, password).subscribe(function (response) {
                console.log('User logged in successfully!');
                var accessToken = response.accessToken;
                var refreshToken = response.refreshToken;
                // Check if rememberMe is true, then store tokens in localStorage
                if (_this.rememberMe === true) {
                    localStorage.setItem('user', JSON.stringify(response));
                    // localStorage.setItem('accessToken', accessToken);
                    //localStorage.setItem('refreshToken', refreshToken);
                }
                else {
                    sessionStorage.setItem('user', JSON.stringify(response));
                    // Otherwise, store tokens in sessionStorage
                    //  sessionStorage.setItem('accessToken', accessToken);
                    //sessionStorage.setItem('refreshToken', refreshToken);
                }
                var userAuthorities = response.authorities.map(function (authority) { return authority.authority; });
                if (userAuthorities.includes("Entreprise")) {
                    _this.router.navigate(['entreprise_dashboard']);
                }
                else if (userAuthorities.includes("USER")) {
                    _this.router.navigate(['user_dashboard']);
                }
                else if (userAuthorities.includes("Employee")) {
                    _this.router.navigate(['user_dashboard']);
                }
                else if (userAuthorities.includes("Manager")) {
                    _this.router.navigate(['user_dashboard']);
                }
                else if (userAuthorities.includes("HR")) {
                    _this.router.navigate(['user_dashboard']);
                }
                else if (userAuthorities.includes("CRM")) {
                    _this.router.navigate(['user_dashboard']);
                }
                else if (userAuthorities.includes("PM")) {
                    _this.router.navigate(['user_dashboard']);
                }
                else if (userAuthorities.includes("Consult")) {
                    _this.router.navigate(['user_dashboard']);
                }
                else if (userAuthorities.includes("ADMIN")) {
                    _this.router.navigate(['admin']);
                }
            }, function (error) {
                sweetalert2_1["default"].fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!"
                });
                _this.loginError = 'Invalid email or password. Please try again.';
            });
        }
        else {
            console.log('Form is invalid. Please check your inputs.');
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __param(0, core_1.Inject(angularx_social_login_1.SocialAuthService))
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;

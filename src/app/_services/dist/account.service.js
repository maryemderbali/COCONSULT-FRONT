"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AccountService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var headers = { headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }) };
var AccountService = /** @class */ (function () {
    function AccountService(router, http, GroupChatservice) {
        this.router = router;
        this.http = http;
        this.GroupChatservice = GroupChatservice;
        this.isconn = false;
        this.oauthURL = 'http://localhost:8082/oauth2/';
        this.googleurl = 'http://localhost:8082/google';
        this.userSubject = new rxjs_1.BehaviorSubject(JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
        this.CurrentUserInfoSubject = new rxjs_1.BehaviorSubject(JSON.parse(localStorage.getItem('myuserinfo') || sessionStorage.getItem('myuserinfo')));
        this.CurrentUserInfo = this.CurrentUserInfoSubject.asObservable();
        this.CurrentgroupchatSubject = new rxjs_1.BehaviorSubject(JSON.parse(localStorage.getItem('currentGroupChat') || 'null'));
        this.CurrentGroupChat = this.CurrentgroupchatSubject.asObservable();
    }
    Object.defineProperty(AccountService.prototype, "userValue", {
        get: function () {
            return this.userSubject.value;
        },
        enumerable: false,
        configurable: true
    });
    AccountService.prototype.login = function (email, password) {
        var _this = this;
        return this.http.post(environment_1.environment.apiUrl + "/api/auth/signIn", { email: email, password: password })
            .pipe(operators_1.map(function (user) {
            // const token = response.accessToken; 
            //        if (rememberMe) {
            // localStorage.setItem('access_token', token);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            // sessionStorage.setItem('userid',user);
            console.info(user);
            _this.userSubject.next(user);
            _this.isconn = true;
            _this.getuserById(user.id).subscribe(function (data) {
                localStorage.setItem('myuserinfo', JSON.stringify(data));
                _this.CurrentUserInfoSubject.next(data);
            });
            _this.GroupChatservice.getGroupChatByUser(user.id).subscribe(function (data) {
                localStorage.setItem('currentGroupChat', JSON.stringify(data));
                _this.CurrentgroupchatSubject.next(data);
            });
            return user;
        }));
    };
    AccountService.prototype.google = function (tokenDto) {
        var _this = this;
        return this.http.post(this.googleurl, tokenDto, headers)
            .pipe(operators_1.map(function (user) {
            // console.info(user);
            _this.userSubject.next(user);
            _this.isconn = true;
            _this.getuserById(user.id).subscribe(function (data) {
                localStorage.setItem('myuserinfo', JSON.stringify(data));
                _this.CurrentUserInfoSubject.next(data);
            });
            _this.GroupChatservice.getGroupChatByUser(user.id).subscribe(function (data) {
                localStorage.setItem('currentGroupChat', JSON.stringify(data));
                _this.CurrentgroupchatSubject.next(data);
            });
            return user;
        }));
    };
    /**!!!!!!!!!!!!ki thebou tgetiw user hw barcha toro9 **/
    //1)jarbou zeda login w a3mou objet User:user mb3d fi constructor a3mlou user=localstorage.getitem('myuserinfo') as User;
    //2)est3mlouha bach tgetiw user info koll
    AccountService.prototype.getCurrentUserInfoValue = function () {
        return this.CurrentUserInfoSubject.value;
    }; //emchiw li servicetkom w asn3ou  currentuser:user; mb3d fi constructor a3mlou 
    //this.currentuser=this.accountservice.getCurrentUserInfoValue() as User;
    //3)e5dmou byh tw yjikom info kol 3lé user
    AccountService.prototype.getCurrentGroupChatValue = function () {
        return this.CurrentgroupchatSubject.value;
    };
    AccountService.prototype.getIsConnected = function () {
        return this.userValue != null;
    };
    AccountService.prototype.updateUserAvailability = function (userId) {
        return this.http.put("http://localhost:8082/api/auth/signOut/", userId);
    };
    AccountService.prototype.logout = function () {
        // remove user from local storage and set current user to null
        localStorage.removeItem('socialuser');
        localStorage.removeItem('currentGroupChat');
        localStorage.removeItem('myuserinfo');
        localStorage.removeItem('email');
        var userId = JSON.parse(localStorage.getItem('user')).id;
        this.updateUserAvailability(userId).subscribe(function (response) {
            console.log('User availability updated successfully:', response);
        });
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('SocialAuthToken');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        // Alternatively, you can use localStorage:
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    };
    AccountService.prototype.register = function (user, roleName) {
        return this.http.post(environment_1.environment.apiUrl + "/api/auth/signup/employee/" + roleName, user);
    };
    AccountService.prototype.getAll = function () {
        return this.http.get(environment_1.environment.apiUrl + "/users");
    };
    //est3mlouha bch tgetiw user bi id nt3ou
    AccountService.prototype.getuserById = function (id) {
        return this.http.get(environment_1.environment.apiUrl + "/api/user/getuserbyid/" + id);
    };
    AccountService.prototype.getCurrentUser = function () {
        return this.user;
    };
    /* update(id: string, params: any) {
         return this.http.put(`${environment.apiUrl}/users/${id}`, params)
             .pipe(map(x => {
                 // update stored user if the logged in user updated their own record
                 if (id.toString() === this.userValue?.iduser?.toString()) {
                     // update local storage
                     const user = { ...this.userValue, ...params };
                     localStorage.setItem('user', JSON.stringify(user));
 
                     // publish updated user to subscribers
                     this.userSubject.next(user);
                 }
                 return x;
             }));
     }*/
    /*  delete(id: string) {
          return this.http.delete(`${environment.apiUrl}/users/${id}`)
              .pipe(map(x => {
                  // auto logout if the logged in user deleted their own record
                  if (id.toString() === this.userValue?.iduser?.toString()) {
                      this.logout();
                  }
                  return x;
              }));
      }*/
    AccountService.prototype.getAuthToken = function () {
        var token = localStorage.getItem('access_token');
        console.log('SERVICE token is' + token);
        return token || 'EMPTY';
    };
    AccountService.prototype.forgetPassword = function (username, resetPass) {
        return this.http.put(environment_1.environment.apiUrl + "/api/user/forgetpass/" + username, resetPass);
    };
    AccountService.prototype.userForgetPassword = function (email) {
        return this.http.post(environment_1.environment.apiUrl + "/api/user/forgetpassword/" + email, null);
    };
    AccountService.prototype.forgetPasswordbyemail = function (email, resetPass) {
        return this.http.put(environment_1.environment.apiUrl + "/api/user/forgetpassbyemail/" + email, resetPass);
    };
    AccountService.prototype.getAccessToken = function () {
        return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    };
    AccountService.prototype.getrefresgtoken = function () {
        return localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
    };
    AccountService.prototype.refreshToken = function () {
        // Implement logic to call the token refresh API
        return this.http.post(environment_1.environment.apiUrl + "/api/auth/refreshToken", { refreshToken: localStorage.getItem('refreshToken') });
    };
    AccountService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;

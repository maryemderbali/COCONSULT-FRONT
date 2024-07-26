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
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var rxjs_1 = require("rxjs");
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 0;
var AppComponent = /** @class */ (function () {
    function AppComponent(renderer, router, document, element) {
        this.renderer = renderer;
        this.router = router;
        this.document = document;
        this.element = element;
        this.isDashboardRoute = false;
        this.iscalcul = false;
    }
    AppComponent.prototype.hasScrolled = function () {
        var st = window.pageYOffset;
        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;
        var navbar = document.getElementsByTagName('nav')[0];
        // If they scrolled down and are past the navbar, add class .headroom--unpinned.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            if (navbar.classList.contains('headroom--pinned')) {
                navbar.classList.remove('headroom--pinned');
                navbar.classList.add('headroom--unpinned');
            }
        }
        else {
            // Scroll Up
            if (st + window.innerHeight < document.body.scrollHeight) {
                if (navbar.classList.contains('headroom--unpinned')) {
                    navbar.classList.remove('headroom--unpinned');
                    navbar.classList.add('headroom--pinned');
                }
            }
        }
        lastScrollTop = st;
    };
    ;
    AppComponent.prototype.ngOnInit = function () {
        //hide main component
        var _this = this;
        this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                _this.isDashboardRoute = event.url.includes('admin') || event.url.includes('user') || event.url.includes('verification') || event.url.includes('calcul') || event.url.includes('contact') || event.url.includes('aboutus')
                    || event.url.includes('password') || event.url.includes('chat');
            }
        });
        this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                _this.iscalcul = event.url.includes('admin') || event.url.includes('user') || event.url.includes('verification') || event.url.includes('aboutus');
            }
        });
        //navbar 
        this._router = this.router.events
            .pipe(rxjs_1.filter(function (event) { return event instanceof router_1.NavigationEnd; }))
            .subscribe(function (event) {
            if (window.outerWidth > 991) {
                window.document.children[0].scrollTop = 0;
            }
            else {
                window.document.activeElement.scrollTop = 0;
            }
        });
        // Select the navbar element using Renderer2
        // const navbar = this.renderer.selectRootElement('nav');
        // Add event listener for scroll using Renderer2
        this.renderer.listen('window', 'scroll', function (event) {
            _this.hasScrolled(); // Call your hasScrolled method
            var number = window.scrollY;
            if (number > 150 || window.pageYOffset > 150) {
                _this.renderer.addClass(_this.navbarComponent, 'headroom--not-top');
            }
            else {
                _this.renderer.removeClass(_this.navbarComponent, 'headroom--not-top');
            }
        });
        this.hasScrolled();
    };
    __decorate([
        core_1.ViewChild('myNavbar')
    ], AppComponent.prototype, "navbarComponent");
    __decorate([
        core_1.HostListener('window:scroll', ['$event'])
    ], AppComponent.prototype, "hasScrolled");
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        }),
        __param(2, core_1.Inject(common_1.DOCUMENT))
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

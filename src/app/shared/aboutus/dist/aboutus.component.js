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
exports.AboutusComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var gsap_1 = require("gsap");
var ScrollTrigger_1 = require("gsap/ScrollTrigger");
gsap_1.gsap.registerPlugin(ScrollTrigger_1.ScrollTrigger);
var AboutusComponent = /** @class */ (function () {
    function AboutusComponent(document) {
        this.document = document;
    }
    AboutusComponent.prototype.ngOnInit = function () {
        this.initialAnimations();
        this.initScrollAnimations();
    };
    AboutusComponent.prototype.initScrollAnimations = function () {
        gsap_1.gsap.to(this.imageFirst.nativeElement, {
            scrollTrigger: {
                trigger: this.imageFirst.nativeElement,
                scrub: true,
                start: '110% center'
            },
            duration: 1.1,
            scale: 1.2,
            height: 380
        });
        gsap_1.gsap.to(this.imageSecond.nativeElement, {
            scrollTrigger: {
                trigger: this.imageSecond.nativeElement,
                scrub: true,
                start: '80% center'
            },
            duration: 1.1,
            scale: 1.2,
            height: 380
        });
        gsap_1.gsap.to(this.document.querySelector('.heading-1'), {
            scrollTrigger: {
                trigger: this.document.querySelector('.heading-1'),
                scrub: true,
                start: '150% center'
            },
            color: '#fff',
            duration: 1.5
        });
        gsap_1.gsap.to(this.document.querySelector('.paragraph'), {
            scrollTrigger: {
                trigger: this.document.querySelector('.paragraph'),
                scrub: true,
                start: '150% center'
            },
            color: '#fff',
            duration: 1.5
        });
        gsap_1.gsap.to(this.document.querySelector('.btn'), {
            scrollTrigger: {
                trigger: this.document.querySelector('.btn'),
                scrub: true,
                start: '150% center'
            },
            color: '#fff',
            duration: 1.5
        });
        gsap_1.gsap.from(this.document.querySelector('#about'), {
            scrollTrigger: {
                trigger: this.document.querySelector('#about'),
                scrub: true,
                toggleClass: 'active',
                start: 'top center'
            },
            duration: 1.5,
            y: 40,
            opacity: 0
        });
        gsap_1.gsap.from(this.document.querySelector('#buy'), {
            scrollTrigger: {
                trigger: this.document.querySelector('#buy'),
                scrub: true,
                toggleClass: 'active',
                start: 'top center'
            },
            duration: 1.5,
            y: 40,
            opacity: 0
        });
        gsap_1.gsap.from(this.document.querySelector('.box'), {
            scrollTrigger: {
                trigger: this.document.querySelector('.box'),
                scrub: true,
                toggleClass: 'active',
                start: '-10% center'
            },
            duration: 1.5,
            width: 0,
            opacity: 0
        });
        gsap_1.gsap.from(this.document.querySelector('.info-1__visual img'), {
            scrollTrigger: {
                trigger: this.document.querySelector('.info-1__visual img'),
                scrub: true,
                toggleClass: 'active',
                start: '-60% bottom'
            },
            duration: 1.5,
            height: 0,
            scale: '1.3',
            opacity: 0
        });
        gsap_1.gsap.from(this.document.querySelector('.quote'), {
            scrollTrigger: {
                trigger: this.document.querySelector('.quote'),
                scrub: true,
                toggleClass: 'active',
                start: '-60% bottom'
            },
            duration: 1.5,
            opacity: 0
        });
        gsap_1.gsap.from(this.document.querySelector('.info-1__text .heading-3'), {
            scrollTrigger: {
                trigger: this.document.querySelector('.info-1__text .heading-3'),
                scrub: true,
                toggleClass: 'active',
                start: '-60% bottom'
            },
            duration: 1.5,
            y: 40,
            opacity: 0
        });
        gsap_1.gsap.from(this.document.querySelector('.info-1__text .paragraph'), {
            scrollTrigger: {
                trigger: this.document.querySelector('.info-1__text .paragraph'),
                scrub: true,
                toggleClass: 'active',
                start: '-60% bottom'
            },
            duration: 1.5,
            y: 40,
            opacity: 0
        });
        gsap_1.gsap.from(this.document.querySelector('.info-1__text .btn--learn'), {
            scrollTrigger: {
                trigger: this.document.querySelector('.info-1__text .btn--learn'),
                scrub: true,
                toggleClass: 'active',
                start: '-60% bottom'
            },
            duration: 1.5,
            y: 40,
            opacity: 0
        });
    };
    AboutusComponent.prototype.initialAnimations = function () {
        gsap_1.gsap.from(this.menu.nativeElement.childNodes, {
            duration: 0.5,
            opacity: 0,
            y: -20,
            stagger: 0.2,
            delay: 0.5
        });
        gsap_1.gsap.from(this.menuSecond.nativeElement.childNodes, {
            duration: 0.5,
            opacity: 0,
            y: -20,
            stagger: 0.2,
            delay: 0.8
        });
        gsap_1.gsap.from(this.imageFirst.nativeElement, {
            duration: 0.7,
            opacity: 0,
            y: -30,
            delay: 0.5
        });
        gsap_1.gsap.from(this.imageSecond.nativeElement, {
            duration: 0.7,
            opacity: 0,
            y: -30,
            delay: 0.6
        });
        gsap_1.gsap.from(this.document.querySelector('.heading-1'), {
            duration: 0.7,
            opacity: 0,
            y: -30,
            delay: 0.6
        });
        gsap_1.gsap.from(this.document.querySelector('.paragraph'), {
            duration: 0.7,
            opacity: 0,
            y: -30,
            delay: 0.7
        });
        gsap_1.gsap.from(this.document.querySelector('.btn'), {
            duration: 0.7,
            opacity: 0,
            y: -30,
            delay: 0.8
        });
    };
    __decorate([
        core_1.ViewChild('secondSection', { static: true })
    ], AboutusComponent.prototype, "secondSection");
    __decorate([
        core_1.ViewChild('menu', { static: true })
    ], AboutusComponent.prototype, "menu");
    __decorate([
        core_1.ViewChild('menuSecond', { static: true })
    ], AboutusComponent.prototype, "menuSecond");
    __decorate([
        core_1.ViewChild('imageFirst', { static: true })
    ], AboutusComponent.prototype, "imageFirst");
    __decorate([
        core_1.ViewChild('imageSecond', { static: true })
    ], AboutusComponent.prototype, "imageSecond");
    __decorate([
        core_1.ViewChild('imageThird', { static: true })
    ], AboutusComponent.prototype, "imageThird");
    AboutusComponent = __decorate([
        core_1.Component({
            selector: 'app-aboutus',
            templateUrl: './aboutus.component.html',
            styleUrls: ['./aboutus.component.css']
        }),
        __param(0, core_1.Inject(common_1.DOCUMENT))
    ], AboutusComponent);
    return AboutusComponent;
}());
exports.AboutusComponent = AboutusComponent;

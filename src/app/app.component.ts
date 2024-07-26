import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd ,RouterEvent} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { filter, Subscription } from 'rxjs';
import { NavbarComponent } from './shared/navbar/navbar.component';

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 0;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChild('myNavbar') navbarComponent: NavbarComponent; // Reference the navbar component

    private _router: Subscription;
    isDashboardRoute: boolean = false;
    iscalcul:boolean=false;

    constructor( private renderer : Renderer2, private router: Router, @Inject(DOCUMENT) private document: any, private element : ElementRef) {}
    @HostListener('window:scroll', ['$event'])
    hasScrolled() {

        var st = window.pageYOffset;
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        var navbar = document.getElementsByTagName('nav')[0];

        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            if (navbar.classList.contains('headroom--pinned')) {
                navbar.classList.remove('headroom--pinned');
                navbar.classList.add('headroom--unpinned');
            }
        } else {
            // Scroll Up
            if(st + window.innerHeight < document.body.scrollHeight) {
                if (navbar.classList.contains('headroom--unpinned')) {
                    navbar.classList.remove('headroom--unpinned');
                    navbar.classList.add('headroom--pinned');
                }
            }
        }

        lastScrollTop = st;
    };



    ngOnInit() {

         //hide main component
          
              this.router.events.subscribe((event: RouterEvent) => {
                if (event instanceof NavigationEnd) {
                  this.isDashboardRoute = event.url.includes('admin')|| event.url.includes('user') || event.url.includes('verification')||event.url.includes('chat')||event.url.includes('chatroom')||event.url.includes('job')||event.url.includes('profil')||event.url.includes('chatc')
                  ||event.url.includes('aboutus')||event.url.includes('candidature')||event.url.includes('Affichagequestion')||event.url.includes('myquiz')||event.url.includes('email')||event.url.includes('reclamation')||event.url.includes('question')||event.url.includes('test');;
                  this.isDashboardRoute = event.url.includes('admin')|| event.url.includes('user') || event.url.includes('verification')||event.url.includes('calcul')||event.url.includes('contact')||event.url.includes('aboutus')
                  ||event.url.includes('password')||event.url.includes('pointage')||event.url.includes('chat');
                }
              });
            
              this.router.events.subscribe((event: RouterEvent) => {
                if (event instanceof NavigationEnd) {
                  this.iscalcul = event.url.includes('admin')|| event.url.includes('user') || event.url.includes('verification')||event.url.includes('aboutus')||event.url.includes('job');
                  ;
                }
              });
          
          

      //navbar 
        this._router = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
            if (window.outerWidth > 991) {
                window.document.children[0].scrollTop = 0;
            } else {
                window.document.activeElement.scrollTop = 0;
            }
        });

    // Select the navbar element using Renderer2
   // const navbar = this.renderer.selectRootElement('nav');

    // Add event listener for scroll using Renderer2
    this.renderer.listen('window', 'scroll', (event) => {
        this.hasScrolled(); // Call your hasScrolled method
        const number = window.scrollY;
        if (number > 150 || window.pageYOffset > 150) {
            this.renderer.addClass(this.navbarComponent, 'headroom--not-top');
        } else {
            this.renderer.removeClass(this.navbarComponent, 'headroom--not-top');
        }
    });
      this.hasScrolled();


     
    }
}

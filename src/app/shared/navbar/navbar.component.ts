import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { AuthService } from 'src/app/login/auth.service';
import { AccountService } from 'src/app/_services';
import { User } from 'src/app/_models';
import { SocialUser } from '@abacritt/angularx-social-login';
import { TokenService } from 'src/app/_services/Token.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    user?: User | null;
    isconn:Boolean;
    userLogged: SocialUser;
    constructor(public location: Location, private router: Router,private authService  :AccountService,private tokenService:TokenService) {
    //    this.isconn= localStorage.getItem('conn')
    this.isconn=this.authService.getIsConnected()|| this.tokenService.getgoogleToken() ||false;

    ///console.error('isconnnnn' +this.isconn)
    this.authService.user.subscribe(x => this.user = x);
    }

    ngOnInit() {

      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
        if (event instanceof NavigationStart) {
           if (event.url != this.lastPoppedUrl)
               this.yScrollStack.push(window.scrollY);
       } else if (event instanceof NavigationEnd) {
           if (event.url == this.lastPoppedUrl) {
               this.lastPoppedUrl = undefined;
               window.scrollTo(0, this.yScrollStack.pop());
           } else
               window.scrollTo(0, 0);
       }
     });
     this.location.subscribe((ev:PopStateEvent) => {
         this.lastPoppedUrl = ev.url;
     });

     
    }
// controlling the navbar ///
    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if( titlee === '#/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '#/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }
    signout(){
        this.authService.logout()
        window.location.reload();

    }
}

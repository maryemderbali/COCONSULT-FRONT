import { Component, OnInit } from '@angular/core';
import {
  barChartOutline,
  appsOutline,
  bulbOutline,
  callOutline,
  settingsOutline,
} from 'ionicons/icons';
import { AccountService } from 'src/app/_services';
import { PointageService } from '../pointage/pointage.service';
import { Subscription } from 'rxjs';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/user_dashboardRH_w/monprofil', title: 'mon-profile',  icon: 'person', class: '' },
    { path: '/user_dashboardRH_w/Conge', title: 'Conge',  icon:'event', class: '' },
    { path: '/user_dashboardRH_w/table-conge', title: 'demande-conge',  icon:'event', class: '' },
    { path: '/user_dashboardRH_w/users', title: 'Users',  icon:'person', class: '' },
     { path: '/user_dashboardRH_w/evaluation-manager', title: 'evaluation-manager',  icon:'assessment', class: '' },
    { path: '/user_dashboardRH_w/solutions', title: 'solutions',  icon:'dashboard', class: '' },
    { path: '/user_dashboardRH_w/settings', title: 'settings&Infos',  icon:'settingsOutline', class: '' },
    { path: '/user_dashboardRH_w/result', title: 'result',  icon:'person', class: '' },



];

@Component({
  selector: 'app-vertical-nav-bar',
  templateUrl: './vertical-nav-bar.component.html',
  styleUrls: ['./vertical-nav-bar.component.css']
})
export class VerticalNavBarComponent implements OnInit {
  ispointed:Boolean;
  
  barChartOutline = barChartOutline;
  appsOutline = appsOutline;
  bulbOutline = bulbOutline;
  callOutline = callOutline;
  settingsOutline = settingsOutline;
  private subscription: Subscription;

  menuItems: any[];

  constructor(private authService  :AccountService,private pointageservice:PointageService) { 
    this.subscription=this.pointageservice.isPointed.subscribe((value)=>{
      this.ispointed=value;
    }
     
    
    );
    //console.log("this pointage",this.ispointed);

  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

}

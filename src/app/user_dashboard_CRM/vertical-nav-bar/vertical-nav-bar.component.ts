import { Component, OnInit } from '@angular/core';
import {
  barChartOutline,
  appsOutline,
  bulbOutline,
  callOutline,
  settingsOutline,
} from 'ionicons/icons';
//import './vertical-nav-bar.component.css'; 


declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/user_dashboard_CRM/monprofil', title: 'mon-profile',  icon: 'notifications', class: '' },
    { path: '/user_dashboard_CRM/payments', title: 'payments',  icon: 'dashboard', class: '' },
    { path: '/user_dashboard_CRM/settings', title: 'Sales Team Activity',  icon:'content_paste', class: '' },
    { path: '/user_dashboard_CRM/prospect', title: 'Prospects',  icon: 'person', class: '' },
    { path: '/user_dashboard_CRM/repertoire', title: 'Directories',  icon: 'group', class: '' },
    { path: '/user_dashboard_CRM/contract', title: 'Contracts',  icon: 'content_paste', class: '' },





];

@Component({
  selector: 'app-vertical-nav-bar',
  templateUrl: './vertical-nav-bar.component.html',
  styleUrls: ['./vertical-nav-bar.component.css']
})
export class VerticalNavBarComponent implements OnInit {
  barChartOutline = barChartOutline;
  appsOutline = appsOutline;
  bulbOutline = bulbOutline;
  callOutline = callOutline;
  settingsOutline = settingsOutline;

  menuItems: any[];

  constructor() { }

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

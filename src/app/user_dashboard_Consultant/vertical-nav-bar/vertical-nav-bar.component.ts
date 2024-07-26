import { Component, OnInit } from '@angular/core';
import {
  barChartOutline,
  appsOutline,
  bulbOutline,
  callOutline,
  settingsOutline,
} from 'ionicons/icons';
import {ProjectDetailsComponent} from '../project-details/project-details.component';
interface RouteWithComponent {
    path: string;
    title: string;
    component: any;
}

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    children?: (RouteInfo | RouteWithComponent)[];

}
export const ROUTES: RouteInfo[] = [
    { path: '/user_dashboard_Consultant/monprofil', title: 'mon-profile',  icon: 'person', class: '' },
    { path: '/user_dashboard_Consultant/solutions', title: 'solutions',  icon:'dashboard', class: '' },
    { path: '/user_dashboard_Consultant/settings', title: 'settings&Infos',  icon:'settingsOutline', class: '' },
    { path: '/user_dashboard_Consultant/assignement', title: 'Assignments', icon: 'assignment', class: '' },
    { path: '/user_dashboard_Consultant/expanses', title: 'Expanses', icon: 'monetization_on', class: '' },
    { path: '/user_dashboard_Consultant/quote', title: 'Quote', icon: 'monetization_on', class: '' },
    { path: '/user_dashboard_Consultant/time-record', title: 'TimeRecord', icon: 'monetization_on', class: '' },
    { path: '/user_dashboard_Consultant/projects', title: 'Projects', icon: 'projects', class: '',
        children: [
            { path: 'project-details', title: 'Project Details', component: ProjectDetailsComponent }
        ]
    },
    { path: '/user_dashboard_Consultant/proj-feed', title: 'ProjectFeed', icon: 'feedbacks', class: '' },
    { path: '/user_dashboard_Consultant/charts-proj', title: 'ChartsProjects', icon: 'fa-chart-barcharts', class: '' },
    { path: '/user_dashboard_Consultant/charts-quotes', title: 'ChartsQuotes', icon: 'chart-area', class: '' },
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

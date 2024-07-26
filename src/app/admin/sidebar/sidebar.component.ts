import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/admindashboard', title: 'ADMINDashboard',  icon: 'dashboard', class: '' },
    { path: '/admin/user-profile', title: 'Ajouter solution',  icon:'person', class: '' },
    { path: '/admin/quiz', title: 'quiz',  icon:'dashboard', class: '' },
    { path: '/admin/questions', title: 'question',  icon:'dashboard', class: '' },
    { path: '/admin/jobs', title: 'jobs',  icon:'dashboard', class: '' },
    { path: '/admin/table-list', title: 'Liste user',  icon:'content_paste', class: '' },
    { path: '/admin/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    {path: '/admin/ChatRooms', title: 'ChatRooms',  icon:'library_books', class: '' },

    { path: '/admin/listesalaire', title: 'Liste Salaire',  icon: 'content_paste', class: '' },
    { path: '/admin/activity', title: 'Activity',  icon:'notifications', class: '' },
    { path: '/admin/ticketlist', title: 'ticketlist',  icon:'notifications', class: '' },
    { path: '/admin/Meeting', title: 'Meeting',  icon:'notifications', class: '' },
    { path: '/admin/Team', title: 'Team',  icon:'notifications', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
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

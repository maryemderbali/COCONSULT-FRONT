"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardModuleRHd = void 0;
//import { NgModule } from '@angular/core';
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var monprofil_component_1 = require("./monprofil/monprofil.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var header_component_1 = require("./header/header.component");
var angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
var forms_1 = require("@angular/forms");
var button_1 = require("@angular/material/button");
var input_1 = require("@angular/material/input");
var core_1 = require("@angular/material/core");
var form_field_1 = require("@angular/material/form-field");
var tooltip_1 = require("@angular/material/tooltip");
var select_1 = require("@angular/material/select");
var settings_component_1 = require("./settings/settings.component");
var ticketlistu_component_1 = require("./ticketlistu/ticketlistu.component");
var paginator_1 = require("@angular/material/paginator");
var meetinf_room_component_1 = require("./meetinf-room/meetinf-room.component");
var meetings_component_1 = require("./meetings/meetings.component");
var activityuse_component_1 = require("./activityuse/activityuse.component");
var dashboardRoutes = [
    { path: 'user_dashboard_employe',
        component: dashboard_component_1.DashboardComponent,
        children: [
            { path: 'monprofil', component: monprofil_component_1.MonprofilComponent },
            { path: 'header', component: header_component_1.HeaderComponent },
            { path: 'vertical-nav-bar', component: VerticalNavBarComponent },
            { path: 'settings', component: settings_component_1.SettingsComponent },
            { path: 'solutions', component: SolutionComponent },
            { path: 'ticketlist', component: ticketlistu_component_1.TicketlistuComponent },
            { path: 'MeetRoom', component: meetinf_room_component_1.MeetinfRoomComponent },
            { path: 'MeetingsListe', component: meetings_component_1.MeetingsComponent },
            { path: 'meeting/:meetingId', component: meetinf_room_component_1.MeetinfRoomComponent },
            { path: 'Activityuse', component: activityuse_component_1.ActivityuseComponent },
        ]
    },
];
var DashboardModuleRHd = /** @class */ (function () {
    function DashboardModuleRHd() {
    }
    DashboardModuleRHd = __decorate([
        NgModule({
            declarations: [
                header_component_1.HeaderComponent,
                dashboard_component_1.DashboardComponent,
                settings_component_1.SettingsComponent,
                SolutionComponent,
                VerticalNavBarComponent,
                monprofil_component_1.MonprofilComponent,
                CardComponent,
                ticketlistu_component_1.TicketlistuComponent,
                meetinf_room_component_1.MeetinfRoomComponent,
                meetings_component_1.MeetingsComponent,
                activityuse_component_1.ActivityuseComponent,
            ],
            imports: [
                router_1.RouterModule.forChild(dashboardRoutes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                button_1.MatButtonModule,
                core_1.MatRippleModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                select_1.MatSelectModule,
                tooltip_1.MatTooltipModule,
                common_1.CommonModule,
                angular_fontawesome_1.FontAwesomeModule,
                paginator_1.MatPaginatorModule,
                // Import other modules you need
                router_1.RouterModule.forChild(dashboardRoutes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                button_1.MatButtonModule,
                core_1.MatRippleModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                select_1.MatSelectModule,
                tooltip_1.MatTooltipModule,
                common_1.CommonModule,
                angular_fontawesome_1.FontAwesomeModule,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [],
            exports: [router_1.RouterModule]
        })
    ], DashboardModuleRHd);
    return DashboardModuleRHd;
}());
exports.DashboardModuleRHd = DashboardModuleRHd;

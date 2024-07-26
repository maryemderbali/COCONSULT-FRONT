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
var vertical_nav_bar_component_1 = require("./vertical-nav-bar/vertical-nav-bar.component");
var core_1 = require("@angular/core");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var header_component_1 = require("./header/header.component");
var angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
var forms_1 = require("@angular/forms");
var button_1 = require("@angular/material/button");
var input_1 = require("@angular/material/input");
var core_2 = require("@angular/material/core");
var form_field_1 = require("@angular/material/form-field");
var tooltip_1 = require("@angular/material/tooltip");
var select_1 = require("@angular/material/select");
var candidatresult_component_1 = require("./candidatresult/candidatresult.component");
var settings_component_1 = require("./settings/settings.component");
var detail_notif_diag_component_1 = require("./header/detail-notif-diag/detail-notif-diag.component");
var card_component_1 = require("./solution/card/card.component");
var dashboardRoutes = [
    { path: 'user_dashboardRH_d',
        component: dashboard_component_1.DashboardComponent,
        children: [
            { path: 'monprofil', component: monprofil_component_1.MonprofilComponent },
            { path: 'header', component: header_component_1.HeaderComponent },
            { path: 'vertical-nav-bar', component: vertical_nav_bar_component_1.VerticalNavBarComponent },
            { path: 'settings', component: settings_component_1.SettingsComponent },
            { path: 'result', component: candidatresult_component_1.CandidatresultComponent }
        ]
    },
];
var DashboardModuleRHd = /** @class */ (function () {
    function DashboardModuleRHd() {
    }
    DashboardModuleRHd = __decorate([
        core_1.NgModule({
            declarations: [
                header_component_1.HeaderComponent,
                dashboard_component_1.DashboardComponent,
                settings_component_1.SettingsComponent,
                card_component_1.CardComponent,
                vertical_nav_bar_component_1.VerticalNavBarComponent,
                monprofil_component_1.MonprofilComponent,
                candidatresult_component_1.CandidatresultComponent,
                detail_notif_diag_component_1.DetailNotifDiagComponent,
            ],
            imports: [
                router_1.RouterModule.forChild(dashboardRoutes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                button_1.MatButtonModule,
                core_2.MatRippleModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                select_1.MatSelectModule,
                tooltip_1.MatTooltipModule,
                common_1.CommonModule,
                angular_fontawesome_1.FontAwesomeModule,
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            providers: [],
            exports: [router_1.RouterModule]
        })
    ], DashboardModuleRHd);
    return DashboardModuleRHd;
}());
exports.DashboardModuleRHd = DashboardModuleRHd;

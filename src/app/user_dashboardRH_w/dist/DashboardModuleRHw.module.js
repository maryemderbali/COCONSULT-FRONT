"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardModuleRHw = void 0;
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
var display_salaries_component_1 = require("./salary/display-salaries.component");
var conge_calendar_component_1 = require("./conge/conge-calendar.component");
var users_component_1 = require("./users/users.component");
var user_profile_component_1 = require("./users/user-profile.component");
var evaluation_manager_component_1 = require("./evaluation/evaluation.manager.component");
var camera_component_1 = require("./pointage/camera.component");
var add_demande_component_1 = require("./demandeConge/add-demande.component");
var table_demande_component_1 = require("./demandeConge/table-demande-component");
var icon_1 = require("@angular/material/icon");
var rappel_pointage_component_1 = require("./pointage/rappel.pointage.component");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var edit_salary_component_1 = require("./salary/edit.salary.component");
var star_rating_component_1 = require("./users/star-rating.component");
var dashboardRoutes = [
    { path: 'user_dashboardRH_w',
        component: dashboard_component_1.DashboardComponent,
        children: [
            { path: 'monprofil', component: monprofil_component_1.MonprofilComponent },
            { path: 'header', component: header_component_1.HeaderComponent },
            { path: 'vertical-nav-bar', component: vertical_nav_bar_component_1.VerticalNavBarComponent },
            { path: 'display-salaries', component: display_salaries_component_1.DisplaySalariesComponent },
            { path: 'Conge', component: conge_calendar_component_1.CongeCalendarComponent },
            { path: 'users', component: users_component_1.UsersComponent },
            { path: 'user/:id', component: user_profile_component_1.UserProfileComponent },
            { path: 'evaluation-manager', component: evaluation_manager_component_1.EvaluationManagerComponent },
            { path: 'pointage', component: camera_component_1.CameraComponent },
            { path: 'pointage/verification', component: rappel_pointage_component_1.RappelPointageComponent },
            { path: 'demande-conge', component: add_demande_component_1.AddAskComponent },
            { path: 'table-conge', component: table_demande_component_1.DemandeCongeComponent },
        ]
    },
];
var DashboardModuleRHw = /** @class */ (function () {
    function DashboardModuleRHw() {
    }
    DashboardModuleRHw = __decorate([
        core_1.NgModule({
            declarations: [
                header_component_1.HeaderComponent,
                dashboard_component_1.DashboardComponent,
                //SettingsComponent,
                //SolutionComponent,
                vertical_nav_bar_component_1.VerticalNavBarComponent,
                monprofil_component_1.MonprofilComponent,
                //CardComponent,
                user_profile_component_1.UserProfileComponent, display_salaries_component_1.DisplaySalariesComponent, edit_salary_component_1.EditSalaryModalComponent,
                star_rating_component_1.StarRatingComponent
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
                table_1.MatTableModule,
                paginator_1.MatPaginatorModule,
                common_1.CommonModule,
                angular_fontawesome_1.FontAwesomeModule,
                // Import other modules you need
                icon_1.MatIconModule,
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            providers: [],
            exports: [router_1.RouterModule]
        })
    ], DashboardModuleRHw);
    return DashboardModuleRHw;
}());
exports.DashboardModuleRHw = DashboardModuleRHw;

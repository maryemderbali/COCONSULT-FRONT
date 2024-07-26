"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardModuleCRM = void 0;
// import { NgModule } from '@angular/core';
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var monprofil_component_1 = require("./monprofil/monprofil.component");
var settings_component_1 = require("./settings/settings.component");
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
var table_1 = require("@angular/material/table");
var contract_component_1 = require("./contract/contract.component");
var prospect_component_1 = require("./prospect/prospect.component");
var repertoire_component_1 = require("./repertoire/repertoire.component");
var add_update_contract_component_1 = require("./add-update-contract/add-update-contract.component");
var datepicker_1 = require("@angular/material/datepicker");
var dialog_1 = require("@angular/material/dialog");
var add_update_repertoires_component_1 = require("./add-update-repertoires/add-update-repertoires.component");
var add_update_prospect_component_1 = require("./add-update-prospect/add-update-prospect.component");
var paginator_1 = require("@angular/material/paginator");
var add_update_activity_sales_team_component_1 = require("./add-update-activity-sales-team/add-update-activity-sales-team.component");
var payments_component_1 = require("./payments/payments.component");
var revenue_component_1 = require("./revenue/revenue.component");
var common_2 = require("@angular/common"); // Import DatePipe from @angular/common
var detail_notif_diag_component_1 = require("./header/detail-notif-diag/detail-notif-diag.component");
var card_component_1 = require("./solution/card/card.component");
var dashboardRoutes = [
    { path: 'user_dashboard_CRM',
        component: dashboard_component_1.DashboardComponent,
        children: [
            { path: 'monprofil', component: monprofil_component_1.MonprofilComponent },
            { path: 'header', component: header_component_1.HeaderComponent },
            { path: 'vertical-nav-bar', component: vertical_nav_bar_component_1.VerticalNavBarComponent },
            { path: 'settings', component: settings_component_1.SettingsComponent },
            { path: 'repertoire', component: repertoire_component_1.RepertoireComponent },
            { path: 'prospect', component: prospect_component_1.ProspectComponent },
            { path: 'contract', component: contract_component_1.ContractComponent },
            { path: 'payments', component: payments_component_1.PaymentsComponent },
        ]
    },
];
var DashboardModuleCRM = /** @class */ (function () {
    function DashboardModuleCRM() {
    }
    DashboardModuleCRM = __decorate([
        core_1.NgModule({
            declarations: [
                header_component_1.HeaderComponent,
                dashboard_component_1.DashboardComponent,
                settings_component_1.SettingsComponent,
                vertical_nav_bar_component_1.VerticalNavBarComponent,
                monprofil_component_1.MonprofilComponent,
                contract_component_1.ContractComponent,
                prospect_component_1.ProspectComponent,
                repertoire_component_1.RepertoireComponent,
                add_update_contract_component_1.AddUpdateContractComponent,
                add_update_repertoires_component_1.AddUpdateRepertoiresComponent,
                add_update_prospect_component_1.AddUpdateProspectComponent,
                add_update_activity_sales_team_component_1.AddUpdateActivitySalesTeamComponent,
                payments_component_1.PaymentsComponent,
                revenue_component_1.RevenueComponent,
                detail_notif_diag_component_1.DetailNotifDiagComponent,
                card_component_1.CardComponent,
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
                common_1.CommonModule, angular_fontawesome_1.FontAwesomeModule,
                datepicker_1.MatDatepickerModule,
                dialog_1.MatDialogModule,
                table_1.MatTableModule,
                //MatButtonModule,
                paginator_1.MatPaginatorModule,
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                // { provide: MAT_DATE_LOCALE, useValue: 'en-US' } ,
                { provide: common_2.DatePipe }
            ],
            exports: [router_1.RouterModule]
        })
    ], DashboardModuleCRM);
    return DashboardModuleCRM;
}());
exports.DashboardModuleCRM = DashboardModuleCRM;

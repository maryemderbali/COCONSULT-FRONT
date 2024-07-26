"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminLayoutModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
//import { AdminLayoutRoutes } from './admin-layout.routing';
var admindashboard_component_1 = require("./admindashboard/admindashboard.component");
var user_profile_component_1 = require("./user-profile/user-profile.component");
var table_list_component_1 = require("./table-list/table-list.component");
var notifications_component_1 = require("./notifications/notifications.component");
var button_1 = require("@angular/material/button");
var input_1 = require("@angular/material/input");
var core_2 = require("@angular/material/core");
var form_field_1 = require("@angular/material/form-field");
var tooltip_1 = require("@angular/material/tooltip");
var select_1 = require("@angular/material/select");
var adminnavbar_component_1 = require("./adminnavbar/adminnavbar.component");
var sidebar_component_1 = require("./sidebar/sidebar.component");
var core_3 = require("@angular/core");
var router_1 = require("@angular/router");
var admin_layout_component_1 = require("./admin-layout/admin-layout.component");
var group_chat_component_1 = require("./group-chat/group-chat.component");
var card_gpchat_component_1 = require("./card-gpchat/card-gpchat.component");
var dialog_1 = require("@angular/material/dialog");
var update_dialog_component_1 = require("./group-chat/update-dialog/update-dialog.component");
var AdminLayoutRoutes = [
    { path: 'admin',
        component: admin_layout_component_1.AdminLayoutComponent,
        children: [
            { path: 'admindashboard', component: admindashboard_component_1.DashboardComponent },
            { path: 'user-profile', component: user_profile_component_1.UserProfileComponent },
            { path: 'table-list', component: table_list_component_1.TableListComponent },
            { path: 'notifications', component: notifications_component_1.NotificationsComponent },
            { path: 'navbar', component: adminnavbar_component_1.NavbarComponent },
            { path: 'sidenavbar', component: sidebar_component_1.SidebarComponent },
            { path: 'ChatRooms', component: group_chat_component_1.GroupChatComponent },
        ] },
];
var AdminLayoutModule = /** @class */ (function () {
    function AdminLayoutModule() {
    }
    AdminLayoutModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(AdminLayoutRoutes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                button_1.MatButtonModule,
                core_2.MatRippleModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                select_1.MatSelectModule,
                tooltip_1.MatTooltipModule,
                dialog_1.MatDialogModule,
            ],
            declarations: [
                admin_layout_component_1.AdminLayoutComponent,
                admindashboard_component_1.DashboardComponent,
                user_profile_component_1.UserProfileComponent,
                table_list_component_1.TableListComponent,
                adminnavbar_component_1.NavbarComponent,
                sidebar_component_1.SidebarComponent,
                notifications_component_1.NotificationsComponent,
                group_chat_component_1.GroupChatComponent,
                card_gpchat_component_1.CardGPCHATComponent,
                update_dialog_component_1.UpdateDialogComponent,
            ],
            schemas: [core_3.CUSTOM_ELEMENTS_SCHEMA],
            providers: [],
            exports: [router_1.RouterModule]
        })
    ], AdminLayoutModule);
    return AdminLayoutModule;
}());
exports.AdminLayoutModule = AdminLayoutModule;

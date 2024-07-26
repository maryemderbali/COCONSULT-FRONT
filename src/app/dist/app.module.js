"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var animations_1 = require("@angular/platform-browser/animations");
var router_1 = require("@angular/router");
var angular_1 = require("@fullcalendar/angular"); // Import FullCalendar module
var app_component_1 = require("./app.component");
var signup_component_1 = require("./signup/signup.component");
var landing_component_1 = require("./landing/landing.component");
var navbar_component_1 = require("./shared/navbar/navbar.component");
var footer_component_1 = require("./shared/footer/footer.component");
var login_component_1 = require("./login/login.component");
var carousel_1 = require("ngx-bootstrap/carousel");
var dashboard_module_1 = require("./user_dashboard_Consultant/dashboard.module");
var angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
var admin_layout_module_1 = require("./admin/admin-layout.module");
var signupentreprise_component_1 = require("./signupentreprise/signupentreprise.component");
var app_routing_1 = require("./app.routing");
var validation_component_1 = require("./validation/validation.component");
var ng_otp_input_1 = require("ng-otp-input");
var aboutus_component_1 = require("./shared/aboutus/aboutus.component");
var contact_component_1 = require("./shared/contact/contact.component");
var about_directive_1 = require("./shared/aboutus/about.directive");
var _helpers_1 = require("./_helpers");
var candidat_component_1 = require("./candidat/candidat.component");
var affichagequestion_component_1 = require("./affichagequestion/affichagequestion.component");
var myquiz_component_1 = require("./myquiz/myquiz.component");
//import { MatDialogModule } from '@angular/material/dialog';
var job_opport_component_1 = require("./job-opport/job-opport.component");
var candidatemail_component_1 = require("./candidatemail/candidatemail.component");
var reclamation_component_1 = require("./reclamation/reclamation.component");
var test_component_1 = require("./test/test.component");
var navbardorra_component_1 = require("./navbardorra/navbardorra.component");
var profile_component_1 = require("./profile/profile.component");
var stepper_1 = require("@angular/material/stepper");
var chat_component_1 = require("./chat/chat.component");
var ngx_captcha_1 = require("ngx-captcha");
var ng_recaptcha_1 = require("ng-recaptcha");
var environment_1 = require("src/environments/environment");
var forgetpass_component_1 = require("./forgetpass/forgetpass.component");
var loginforgetpassword_component_1 = require("./loginforgetpassword/loginforgetpassword.component");
var chat_room_component_1 = require("./chat-room/chat-room.component");
var salary_component_1 = require("./user_dashboardRH_w/salary/salary.component");
var dialog_1 = require("@angular/material/dialog");
var add_conge_modal_component_1 = require("./user_dashboardRH_w/conge/add-conge-modal.component");
var users_component_1 = require("./user_dashboardRH_w/users/users.component");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var evaluation_component_1 = require("./user_dashboardRH_w/evaluation/evaluation.component");
var evaluation_manager_component_1 = require("./user_dashboardRH_w/evaluation/evaluation.manager.component");
var camera_component_1 = require("./user_dashboardRH_w/pointage/camera.component");
var add_demande_component_1 = require("./user_dashboardRH_w/demandeConge/add-demande.component");
var table_demande_component_1 = require("./user_dashboardRH_w/demandeConge/table-demande-component");
var icon_1 = require("@angular/material/icon");
var rappel_pointage_component_1 = require("./user_dashboardRH_w/pointage/rappel.pointage.component");
var conge_details_modal_component_1 = require("./user_dashboardRH_w/conge/conge-details-modal.component");
var admin_list_salaire_1 = require("./admin/salaire/admin-list-salaire");
var DashboardModuleRHw_module_1 = require("./user_dashboardRH_w/DashboardModuleRHw.module");
var config = { url: 'ws://localhost:8082/ws', options: {} };
// social login
var angularx_social_login_1 = require("@abacritt/angularx-social-login");
var angularx_social_login_2 = require("@abacritt/angularx-social-login");
var DashboardModuleRHd_module_1 = require("./user_dashboardRH_d/DashboardModuleRHd.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                signupentreprise_component_1.SignupEntrpriseComponent,
                signup_component_1.SignupComponent,
                landing_component_1.LandingComponent,
                navbar_component_1.NavbarComponent,
                footer_component_1.FooterComponent,
                login_component_1.LoginComponent,
                validation_component_1.ValidationComponent,
                aboutus_component_1.AboutusComponent,
                contact_component_1.ContactComponent,
                candidat_component_1.CandidatComponent,
                affichagequestion_component_1.AffichagequestionComponent,
                test_component_1.TESTComponent,
                about_directive_1.AboutDirective,
                myquiz_component_1.MyquizComponent,
                job_opport_component_1.JobOpportComponent,
                candidatemail_component_1.CandidatemailComponent,
                reclamation_component_1.ReclamationComponent,
                navbardorra_component_1.NavbardorraComponent,
                profile_component_1.ProfileComponent,
                chat_component_1.ChatComponent,
                forgetpass_component_1.ForgetpassComponent,
                loginforgetpassword_component_1.LoginforgetpasswordComponent,
                chat_room_component_1.ChatRoomComponent,
                salary_component_1.SalaryComponent,
                add_conge_modal_component_1.AddCongeModalComponent,
                users_component_1.UsersComponent,
                evaluation_component_1.EvaluationComponent,
                evaluation_manager_component_1.EvaluationManagerComponent,
                camera_component_1.CameraComponent,
                add_demande_component_1.AddAskComponent,
                table_demande_component_1.DemandeCongeComponent,
                rappel_pointage_component_1.RappelPointageComponent,
                conge_details_modal_component_1.CongeDetailsModalComponent,
                admin_list_salaire_1.AdminListSalaire
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            imports: [angularx_social_login_1.SocialLoginModule,
                forms_1.ReactiveFormsModule,
                ngx_captcha_1.NgxCaptchaModule,
                ng_recaptcha_1.RecaptchaModule,
                ng_recaptcha_1.RecaptchaFormsModule,
                ng_otp_input_1.NgOtpInputModule,
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                ng_bootstrap_1.NgbModule,
                forms_1.FormsModule,
                router_1.RouterModule,
                app_routing_1.AppRoutingModule,
                http_1.HttpClientModule,
                dialog_1.MatDialogModule,
                carousel_1.CarouselModule.forRoot(),
                angular_fontawesome_1.FontAwesomeModule,
                DashboardModuleRHd_module_1.DashboardModuleRHd,
                stepper_1.MatStepperModule,
                forms_1.ReactiveFormsModule,
                admin_layout_module_1.AdminLayoutModule,
                DashboardModuleRHw_module_1.DashboardModuleRHw,
                angular_1.FullCalendarModule,
                dialog_1.MatDialogModule,
                forms_1.FormsModule,
                table_1.MatTableModule,
                paginator_1.MatPaginatorModule,
                icon_1.MatIconModule,
            ],
            exports: [candidatemail_component_1.CandidatemailComponent],
            providers: [{
                    provide: 'SocialAuthServiceConfig',
                    useValue: {
                        autoLogin: false,
                        providers: [
                            {
                                id: angularx_social_login_2.GoogleLoginProvider.PROVIDER_ID,
                                provider: new angularx_social_login_2.GoogleLoginProvider('949795246115-prildq4d724cv6tr1a3tc441c1n8csct.apps.googleusercontent.com')
                            }
                        ],
                        onError: function (err) {
                            console.error(err);
                        }
                    }
                },
                {
                    provide: ng_recaptcha_1.RECAPTCHA_SETTINGS,
                    useValue: {
                        siteKey: environment_1.environment.recaptcha.siteKey,
                        size: 'normal'
                    }
                }, { provide: http_1.HTTP_INTERCEPTORS, useClass: _helpers_1.JwtInterceptor, multi: true },
                { provide: http_1.HTTP_INTERCEPTORS, useClass: _helpers_1.ErrorInterceptor, multi: true },],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

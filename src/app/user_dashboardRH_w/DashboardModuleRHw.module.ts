//import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { MonprofilComponent } from './monprofil/monprofil.component';
import { VerticalNavBarComponent } from './vertical-nav-bar/vertical-nav-bar.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '../app.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { SalaryComponent } from './salary/salary.component';
import { DisplaySalariesComponent } from './salary/display-salaries.component';
import { CongeCalendarComponent } from './conge/conge-calendar.component';
import { UsersComponent } from './users/users.component';
import { UserProfileComponent } from './users/user-profile.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { EvaluationManagerComponent } from './evaluation/evaluation.manager.component';
import { CameraComponent } from './pointage/camera.component';
import { AddAskComponent } from './demandeConge/add-demande.component';
import { DemandeCongeComponent } from './demandeConge/table-demande-component';
import {MatIconModule} from '@angular/material/icon';
import { RappelPointageComponent } from './pointage/rappel.pointage.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditSalaryModalComponent } from './salary/edit.salary.component';
import { StarRatingComponent } from './users/star-rating.component';
import {CandidatresultComponent} from "./candidatresult/candidatresult.component";
import {AuthGuard} from "../_helpers";
const dashboardRoutes: Routes = [

    { path: 'user_dashboardRH_w',
        component: DashboardComponent,
        canActivate:[ AuthGuard] ,data: { requiredRole: 'HR' },
        children: [
            {path:'monprofil',component:MonprofilComponent},
            {path:'header', component:HeaderComponent},
            { path: 'vertical-nav-bar', component: VerticalNavBarComponent },
            { path: 'display-salaries', component: DisplaySalariesComponent },
            { path: 'Conge', component: CongeCalendarComponent },
            { path: 'users', component: UsersComponent },
            { path: 'user/:id', component: UserProfileComponent },
            { path: 'evaluation-manager', component: EvaluationManagerComponent },
            { path: 'pointage', component: CameraComponent },
            { path: 'pointage/verification', component: RappelPointageComponent },

            { path: 'demande-conge', component: AddAskComponent },
            { path: 'table-conge', component: DemandeCongeComponent },
            {path:'result', component:CandidatresultComponent},


        ],
    },
];



@NgModule({
    declarations: [
        CandidatresultComponent,
        HeaderComponent,
        DashboardComponent,
        //SettingsComponent,
        //SolutionComponent,
        VerticalNavBarComponent,
        MonprofilComponent,
        //CardComponent,
        UserProfileComponent,DisplaySalariesComponent,EditSalaryModalComponent,
        StarRatingComponent

    ],
    imports: [

        RouterModule.forChild(dashboardRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        CommonModule,
        FontAwesomeModule,
        // Import other modules you need
        MatIconModule,

        // Configure child routes
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

    providers: [],
    exports: [RouterModule]
})
export class DashboardModuleRHw { }

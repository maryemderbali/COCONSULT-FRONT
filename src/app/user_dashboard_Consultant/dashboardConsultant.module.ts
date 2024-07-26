//import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { MonprofilComponent } from './monprofil/monprofil.component';
import { SettingsComponent } from './settings/settings.component';
import { SolutionComponent } from './solution/solution.component';
import { VerticalNavBarComponent } from './vertical-nav-bar/vertical-nav-bar.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '../app.routing';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { CardComponent } from './solution/card/card.component';
import {AssignmentsComponent} from './assignement/assignement.component';
import {ProjectDetailsComponent} from './project-details/project-details.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ExpansesComponent} from './expanses/expanses.component';
import {ProjFeedComponent} from './proj-feed/proj-feed.component';
import {ProjectsComponent} from './projects/projects.component';
import {TimeRecordComponent} from './time-record/time-record.component';
import {QuoteComponent} from './quote/quote.component';
import {ChartsProjComponent} from './charts-proj/charts-proj.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "../_helpers";

const dashboardRoutes: Routes = [
    { path: 'user_dashboard_Consultant',
        component: DashboardComponent,
    canActivate:[ AuthGuard] ,data: { requiredRole: 'Consult' },
        children: [
            {path:'monprofil',component:MonprofilComponent},
            {path:'header', component:HeaderComponent},
            { path: 'vertical-nav-bar', component: VerticalNavBarComponent },
            {path: 'settings',component:SettingsComponent},
            {path:'solutions', component:SolutionComponent},
            { path: 'assignement', component: AssignmentsComponent },
            { path: 'expanses', component: ExpansesComponent },
            { path: 'proj-feed', component: ProjFeedComponent },
            { path: 'projects', component: ProjectsComponent },
            { path: 'time-record', component: TimeRecordComponent },
            { path: 'quote', component: QuoteComponent },
            { path: 'project-details/:projectId', component: ProjectDetailsComponent },
            { path: 'charts-proj', component: ChartsProjComponent },
            //{ path: 'charts-quotes', component: ChartsQuotesComponent },
        ],
    },
];

@NgModule({
    declarations: [
        HeaderComponent,
        DashboardComponent,
        SettingsComponent,
        SolutionComponent,
        VerticalNavBarComponent,
        MonprofilComponent,
        CardComponent,
        AssignmentsComponent,
        ExpansesComponent,
        ProjectsComponent,
        ProjFeedComponent,
        QuoteComponent,
        TimeRecordComponent,
        ChartsProjComponent,

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
        CommonModule,
        FontAwesomeModule,
        MatPaginatorModule,

        // Import other modules you need

        // Configure child routes
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

    providers: [],
    exports: [RouterModule]
})
export class DashboardConsultantModule { }

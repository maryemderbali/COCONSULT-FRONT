// import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { MonprofilComponent } from './monprofil/monprofil.component';
import { SettingsComponent } from './settings/settings.component';
import { VerticalNavBarComponent } from './vertical-nav-bar/vertical-nav-bar.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '../app.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MAT_DATE_LOCALE, MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { ContractComponent } from './contract/contract.component';
import { ProspectComponent } from './prospect/prospect.component';
import { RepertoireComponent } from './repertoire/repertoire.component';

import { AddUpdateContractComponent } from './add-update-contract/add-update-contract.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { AddUpdateRepertoiresComponent } from './add-update-repertoires/add-update-repertoires.component';
import { AddUpdateProspectComponent } from './add-update-prospect/add-update-prospect.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddUpdateActivitySalesTeamComponent } from './add-update-activity-sales-team/add-update-activity-sales-team.component';
import { PaymentsComponent } from './payments/payments.component';
import { RevenueComponent } from './revenue/revenue.component';
import { DatePipe } from '@angular/common'; // Import DatePipe from @angular/common
import { DetailNotifDiagComponent } from './header/detail-notif-diag/detail-notif-diag.component';
import { CardComponent } from './solution/card/card.component';
import {AuthGuard} from "../_helpers";
const dashboardRoutes: Routes = [
 { path: 'user_dashboard_CRM',
  component: DashboardComponent,
  //canActivate:[ AuthGuard] ,data: { requiredRole: 'CRM' },
  children: [
    {path:'monprofil',component:MonprofilComponent},
    {path:'header', component:HeaderComponent},
    {path: 'vertical-nav-bar', component: VerticalNavBarComponent },
    {path: 'settings',component:SettingsComponent},
    {path:'repertoire', component:RepertoireComponent},
    {path:'prospect', component:ProspectComponent},
    {path:'contract', component:ContractComponent},
    {path:'payments', component:PaymentsComponent },

   


  ],
  },
  ];
    
  
  
  @NgModule({
    declarations: [
      HeaderComponent,
      DashboardComponent,
      SettingsComponent,
      VerticalNavBarComponent,
      MonprofilComponent,
      ContractComponent,
      ProspectComponent,
      RepertoireComponent,
      AddUpdateContractComponent,
      AddUpdateRepertoiresComponent,
      AddUpdateProspectComponent,
      AddUpdateActivitySalesTeamComponent,
      PaymentsComponent,
      RevenueComponent,
      DetailNotifDiagComponent,
      CardComponent,
      
      
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
    CommonModule,    FontAwesomeModule,
    MatDatepickerModule,
    MatDialogModule,
    MatTableModule,
    //MatButtonModule,
    MatPaginatorModule,

      
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
     // { provide: MAT_DATE_LOCALE, useValue: 'en-US' } ,
        { provide: DatePipe}  
    ],
    exports: [RouterModule]
  })
  export class DashboardModuleCRM { }

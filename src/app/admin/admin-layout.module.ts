import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { DashboardComponent } from './admindashboard/admindashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { NavbarComponent } from './adminnavbar/adminnavbar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SidebarComponent } from './sidebar/sidebar.component';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

import { QuestionComponent } from './admindashboard/question/question.component';
import { AjouterquizComponent } from './admindashboard/ajouterquiz/ajouterquiz.component';
import { UpdatequizComponent } from './admindashboard/updatequiz/updatequiz.component';
import { QuizComponent } from './admindashboard/quiz/quiz.component';
import { MatTableModule } from '@angular/material/table';
import { QuestionsComponent } from './admindashboard/questions/questions.component';
import { UpdatequestionComponent } from './admindashboard/updatequestion/updatequestion.component';
import { JobsComponent } from './admindashboard/jobs/jobs.component';

import { UpdatejobdComponent } from './admindashboard/updatejobd/updatejobd.component';
import { AddjobsComponent } from './admindashboard/addjobs/addjobs.component';
import { EntretienComponent } from './admindashboard/entretien/entretien.component';

import { GroupChatComponent } from './group-chat/group-chat.component';
import { CardGPCHATComponent } from './card-gpchat/card-gpchat.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateDialogComponent } from './group-chat/update-dialog/update-dialog.component';
import { NotifDialogComponent } from './notifications/notif-dialog/notif-dialog.component';
import { AdminListSalaire } from './salaire/admin-list-salaire';
import { ActivityComponent } from './activity/activity.component';
import { AddactivityComponent } from './addactivity/addactivity.component';
import { EditActivityComponent } from '../edit-activity/edit-activity.component';
import { TicketlistComponent } from './ticketlist/ticketlist.component';
import { AddTicketlistComponent } from './addticketlist/addticketlist.component';
import { EditticketlistComponent } from './editticketlist/editticketlist.component';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';
import { MeetingComponent } from './meeting/meeting.component';
import { EditMeetingComponent } from './edit-meeting/edit-meeting.component';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { TeamComponent } from './team/team.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { MatStepperModule } from '@angular/material/stepper';
import { RoomComponent } from './room/room.component';
import { HomemeetComponent } from './homemeet/homemeet.component';
import { MeetingAffectuserComponent } from './meeting-affectuser/meeting-affectuser.component';
//import { RoomConfigurationComponent } from './room-configuration/room-configuration.component';
import { ListesUsersMeetComponent } from './listes-users-meet/listes-users-meet.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { AffecterUserAteamComponent } from './affecter-user-ateam/affecter-user-ateam.component';
import {AuthGuard} from "../_helpers";
const AdminLayoutRoutes: Routes = [
  {path:'admin',
component:AdminLayoutComponent,canActivate:[ AuthGuard] ,data: { requiredRole: 'ADMIN' },

children: [
   { path: 'admindashboard',      component: DashboardComponent },
   { path: 'user-profile',   component: UserProfileComponent },
   { path: 'table-list',     component: TableListComponent },
   { path: 'notifications',  component: NotificationsComponent },
   { path: 'navbar',  component: NavbarComponent },
   { path: 'sidenavbar',  component: SidebarComponent },
   { path: 'ajouterquiz',  component: AjouterquizComponent },
   { path: 'questions',  component: QuestionsComponent },
   { path: 'updatequiz',  component: UpdatequizComponent },
   { path: 'quiz',  component: QuizComponent },
   { path: 'jobs',  component: JobsComponent },
    { path: 'ticketlist', component: TicketlistComponent },
    { path: 'addticketlist', component: AddTicketlistComponent },
    { path: 'Meeting', component: MeetingComponent },
    { path: 'Team', component: TeamComponent },
    { path: 'room', component: RoomComponent },
    { path: 'homemeet', component: HomemeetComponent },
    { path: 'useraffecttomeet', component: MeetingAffectuserComponent },
    //{ path: 'RoomConfiguration', component: RoomConfigurationComponent },

   { path: 'ChatRooms',  component: GroupChatComponent },
    { path: 'listesalaire', component: AdminListSalaire },
    { path: 'addactivity', component: AddactivityComponent },
    { path: 'edit/:id', component: EditActivityComponent },
    { path: 'activity', component: ActivityComponent },]}





];

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule.forChild(AdminLayoutRoutes),
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule, 
    MatSelectModule,
    MatTooltipModule,
    MatTableModule ,
    MatDialogModule,
   MatPaginatorModule,

    MatStepperModule,

  ],
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    NavbarComponent,
    SidebarComponent,
    NotificationsComponent,
    QuestionComponent,
    AjouterquizComponent,
    UpdatequizComponent,
    QuizComponent,
    QuestionsComponent,
    UpdatequestionComponent,
    JobsComponent,

    UpdatejobdComponent,
    AddjobsComponent,
    EntretienComponent,

    GroupChatComponent,
    CardGPCHATComponent,
    UpdateDialogComponent,
    NotifDialogComponent,
          ActivityComponent,
    AddactivityComponent,
    EditActivityComponent,
    TicketlistComponent,
    AddTicketlistComponent,
    EditticketlistComponent,
    TicketdetailsComponent,
    MeetingComponent,
    EditMeetingComponent,
    AddMeetingComponent,
    TeamComponent,
    EditTeamComponent,
    AddTeamComponent,
    RoomComponent,
    HomemeetComponent,
    MeetingAffectuserComponent,
   // RoomConfigurationComponent,
    ListesUsersMeetComponent,
    MeetingDetailsComponent,
    AffecterUserAteamComponent,
  ],
  providers: [],
  exports: [RouterModule],
})
export class AdminLayoutModule {}

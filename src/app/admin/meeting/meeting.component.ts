import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MeetingService } from 'src/app/_services/meeting.service';
import { MatDialog } from '@angular/material/dialog';
import { Meeting } from 'src/app/_models/Meeting';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AddMeetingComponent } from '../add-meeting/add-meeting.component';
import { MeetingAffectuserComponent } from '../meeting-affectuser/meeting-affectuser.component'; // Ajout de l'import pour le composant MeetingAffectuserComponent
import { User } from 'src/app/_models';
import { MeetingDetailsComponent } from '../meeting-details/meeting-details.component';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnDestroy {
  meetings: Meeting[] = [];
  searchTerm: string = '';
  sortedByDate: boolean = false; // Variable to track the sorting 
  pageSize: number = 10; // Nombre d'éléments par page
  currentPage: number = 0; // Page actuelle
  pagedMeetings: Meeting[] = []; // Réunions affichées sur la page actuelle
  private meetingSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private meetingService: MeetingService,
    private dialog: MatDialog,
  ) {}

  ngOnDestroy(): void {
    this.meetingSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadMeetings();
  }
  openMeetingDetails(meetingId: number) {
    const dialogRef = this.dialog.open(MeetingDetailsComponent, {
      width: '50%',
      data: {
        meetingId: meetingId // Passer l'ID du meeting en tant que donnée
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        // Mettez à jour si nécessaire
      }
    });
  }
  updatePage() {
    const filteredMeetings = this.filterMeetings();
    
    const startIndex = this.currentPage * this.pageSize;
  
    this.pagedMeetings = filteredMeetings.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
  }
  
  openAddMeeting() {
    const dialogRef = this.dialog.open(AddMeetingComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadMeetings();
      }
    });
  }

  openAffectationPopup(meetingId: number) {
    const dialogRef = this.dialog.open(MeetingAffectuserComponent, {
      width: '50%',
      data: {
        meetingId: meetingId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadMeetings();
      }
    });
  }

  loadMeetings() {
    this.meetingSubscription = this.meetingService.getAllMeetings().subscribe(meetings => {
      this.meetings = meetings;
  
      if (!this.sortedByDate) {
        this.sortMeetingsByDate();
      }
  
      this.updatePage();
    });
  }

  sortMeetingsByDate() {
    this.meetings.sort((a, b) => {
      const dateA = new Date(a.dateMeeting);
      const dateB = new Date(b.dateMeeting);
  
      return dateB.getTime() - dateA.getTime();
    });
  
    this.sortedByDate = true;
  }

  deleteMeeting(meetingId: number) {
    if (confirm("Are you sure you want to delete this meeting?")) {
      this.meetingService.deleteMeetingById(meetingId).subscribe(() => {
        this.loadMeetings();
      });
    }
  }

  filterMeetings(): Meeting[] {
    return this.meetings.filter(meeting =>
      meeting.idMeeting.toString().includes(this.searchTerm) ||
      meeting.typeMeet.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      meeting.dateMeeting.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

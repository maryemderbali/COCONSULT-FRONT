import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MeetingService } from 'src/app/_services/meeting.service';
import { MatDialog } from '@angular/material/dialog';
import { Meeting } from 'src/app/_models/Meeting';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AddMeetingComponent } from 'src/app/admin/add-meeting/add-meeting.component';
import { MeetinfRoomComponent } from '../meetinf-room/meetinf-room.component';
@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent {
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

  loadMeetings() {
    this.meetingSubscription = this.meetingService.getAllMeetings().subscribe(meetings => {
      this.meetings = meetings;
  
      if (!this.sortedByDate) {
        this.sortMeetingsByDate();
      }
  
      this.updatePage();
    });
  }
  joinMeetingPopup(meeting: Meeting) {
    console.log("Meet",meeting);
    const dialogRef = this.dialog.open(MeetinfRoomComponent, {
      panelClass: 'mat-dialog-full-screen', // Ajoutez la classe pour le plein écran
      data:  meeting.idMeeting
        
     
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadMeetings(); // Recharger les réunions si nécessaire
      }
    });
  }
  

  // Méthode pour trier les réunions par date
  sortMeetingsByDate() {
    this.meetings.sort((a, b) => {
      // Convertir les dates en objets Date pour la comparaison
      const dateA = new Date(a.dateMeeting);
      const dateB = new Date(b.dateMeeting);
  
      // Comparer les dates dans l'ordre inverse pour trier du plus récent au plus ancien
      return dateB.getTime() - dateA.getTime();
    });
  
    // Mettre à jour l'état de tri
    this.sortedByDate = true;
  }

  // Autres méthodes de votre composant...
/*
  editMeeting(meetingId: number) {
    const dialogRef = this.dialog.open(EditMeetingComponent, {
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
*/
  deleteMeeting(meetingId: number) {
    if (confirm("Are you sure you want to delete this meeting?")) {
      this.meetingService.deleteMeetingById(meetingId).subscribe(() => {
        this.loadMeetings();
      });
    }
  }

  // Ajoutez d'autres méthodes selon vos besoins

  filterMeetings(): Meeting[] {
    return this.meetings.filter(meeting =>
      meeting.idMeeting.toString().includes(this.searchTerm) ||
      meeting.typeMeet.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      meeting.dateMeeting.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

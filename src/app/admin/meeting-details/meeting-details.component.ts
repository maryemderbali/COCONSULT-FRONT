import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/_models';
import { Meeting } from 'src/app/_models/Meeting';
import { MeetingService } from 'src/app/_services/meeting.service';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css']
})
export class MeetingDetailsComponent implements OnInit {
  meeting: Meeting;
  users: User[];

  constructor(
    private dialogRef: MatDialogRef<MeetingDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, // Injecter les données
    private meetingService: MeetingService
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID du meeting depuis les données injectées
    const meetingId = this.data.meetingId;

    // Appeler le service pour récupérer les détails du meeting
    this.meetingService.getMeetingById(meetingId).subscribe(meeting => {
      this.meeting = meeting;
      // Récupérer les utilisateurs affectés à ce meeting
      this.loadUsersByMeetingId(meetingId);
    });
  }

  loadUsersByMeetingId(meetingId: number) {
    this.meetingService.getUsersByMeetingId(meetingId).subscribe(users => {
      this.users = users;
    });
  }

  close() {
    this.dialogRef.close();
  }
}

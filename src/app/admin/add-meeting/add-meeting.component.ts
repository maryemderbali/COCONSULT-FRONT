import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MeetingService } from 'src/app/_services/meeting.service';
import { Meeting, TypeMeet } from '../../_models/Meeting';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent {
  meetingForm!: FormGroup;
  newMeeting: Meeting = new Meeting(); 
  typesMeet: string[] = Object.values(TypeMeet);

  constructor(
    private meetingService: MeetingService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddMeetingComponent>
  ) {}

  ngOnInit(): void {
    this.meetingForm = this.formBuilder.group({
      dateMeeting: ['', Validators.required],
      typeMeet: ['', Validators.required]
    });
  }

  addMeeting() {
    const dateMeeting = this.meetingForm.value.dateMeeting;
    const typeMeet = this.meetingForm.value.typeMeet;

    const newMeeting = new Meeting();
    newMeeting.dateMeeting = new Date(this.meetingForm.value.dateMeeting); // Convertir en Date
    newMeeting.typeMeet = typeMeet;

this.meetingService.addMeeting(newMeeting).subscribe(meeting => {
  this.dialogRef.close(meeting);
});
  }

  onCancel() {
    this.dialogRef.close();
  }
}

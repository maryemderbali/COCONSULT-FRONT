import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tickets } from 'src/app/_models/Tickets';

@Component({
  selector: 'app-ticketdetails',
  templateUrl: './ticketdetails.component.html',
  styleUrls: ['./ticketdetails.component.css']
})
export class TicketdetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<TicketdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public ticket: Tickets
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

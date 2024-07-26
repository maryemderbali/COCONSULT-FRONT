import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TicketService } from 'src/app/_services/tickets.service';
import { Tickets, TicketPriority, TicketStatus } from '../../_models/Tickets';

@Component({
  selector: 'app-editticketlist',
  templateUrl: './editticketlist.component.html',
  styleUrls: ['./editticketlist.component.css']
})
export class EditticketlistComponent implements OnInit {
  ticketForm!: FormGroup;
  ticketId: number;
  ticketPriorityOptions = Object.values(TicketPriority);
  ticketStatusOptions = Object.values(TicketStatus);

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditticketlistComponent>,
    private ticketService: TicketService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ticketId = data.ticketId;
  }

  ngOnInit(): void {
    this.ticketForm = this.formBuilder.group({
      ticketPriority: ['', Validators.required],
      ticketContent: ['', Validators.required],
      ticketTitle: ['', Validators.required],
      dateAssigned: ['', Validators.required],
      ticketStatus: ['', Validators.required]
    });

    this.loadTicketDetails(this.ticketId);
  }

  loadTicketDetails(ticketId: number) {
    this.ticketService.getTicketById(ticketId).subscribe(ticket => {
      this.ticketForm.patchValue({
        ticketPriority: ticket.ticketPriority,
        ticketContent: ticket.ticketContent,
        ticketTitle: ticket.tickettitle,
        dateAssigned: ticket.dateAssigned,
        ticketStatus: ticket.ticketStatus
      });
    });
  }

  updateTicket() {
    if (this.ticketForm.valid) {
      const updatedTicket: Tickets = this.ticketForm.value;
      this.ticketService.editTicketById(this.ticketId, updatedTicket).subscribe(() => {
        this.dialogRef.close('success');
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

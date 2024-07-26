import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../_models/user';
import { TicketPriority, TicketStatus, Tickets } from 'src/app/_models/Tickets';
import { TicketService } from 'src/app/_services/tickets.service';
import { UserlistService } from '../table-list/userlist.service';

@Component({
  selector: 'app-addticketlist',
  templateUrl: './addticketlist.component.html',
  styleUrls: ['./addticketlist.component.css']
})
export class AddTicketlistComponent implements OnInit {
  ticketForm!: FormGroup;
  ticketis: Tickets[] = [];
  newTicket: Tickets = new Tickets(); 
  ticketStatus: string[] = Object.values(TicketStatus)
  ticketPriority: string[] = Object.values(TicketPriority);
  users: User[] = [];
  ticketAdded: EventEmitter<Tickets> = new EventEmitter<Tickets>();

  constructor(
    private ticketService: TicketService,
    private userService: UserlistService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<AddTicketlistComponent>
  ) {}

  ngOnInit(): void {
    this.ticketForm = this.formBuilder.group({
      ticketPriority: ['', Validators.required],
      ticketContent: ['', Validators.required],
      tickettitle: ['', Validators.required],
      dateAssigned: [new Date(), Validators.required], // Assigner automatiquement la date actuelle
      ticketStatus: [{ value: 'Open', disabled: true }, Validators.required], // Statut par défaut "Open" et désactivé
      username: ['', Validators.required]
    });

    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUserList().subscribe(users => {
      this.users = users;
    });
  }

  addTicket() {
    const ticketPriority = this.ticketForm.value.ticketPriority;
    const ticketContent = this.ticketForm.value.ticketContent;
    const tickettitle = this.ticketForm.value.tickettitle;
    const dateAssigned = new Date(); // Utiliser la date actuelle
    const ticketStatus = 'Open'; // Définir le statut du ticket sur "Open"
    const username = this.ticketForm.value.username;
  
    const newTicket = new Tickets();
    newTicket.ticketPriority = ticketPriority;
    newTicket.ticketContent = ticketContent;
    newTicket.tickettitle = tickettitle;
    newTicket.dateAssigned = dateAssigned; 
    newTicket.ticketStatus = ticketStatus; // Assurez-vous que le statut est défini sur "Open"
  
    this.ticketService.addTicketAndAssignUser(newTicket, username).subscribe(ticket => {
        this.ticketis.push(ticket);
        this.router.navigate(['//admin/ticketlist']);
        this.dialogRef.close(this.newTicket);
        this.ticketAdded.emit(this.newTicket);
    });
  }
  

  onCancel() {
    this.dialogRef.close();
  }
}

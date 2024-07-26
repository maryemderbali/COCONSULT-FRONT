import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core'; // Import Calendar from FullCalendar core
import dayGridPlugin from '@fullcalendar/daygrid'; 
import { CongeService } from './conge-service';
import { MatDialog } from '@angular/material/dialog';
import { AddCongeModalComponent } from './add-conge-modal.component';
import { CongeDetailsModalComponent } from './conge-details-modal.component';

@Component({
  selector: 'app-conge-calendar',
  templateUrl: './conge-calendar.component.html',
    styleUrls: ['./conge-calendar.component.css']
})
export class CongeCalendarComponent implements OnInit {
    conges: any[];
    calendar: any;
    constructor(private congeService: CongeService,private dialog: MatDialog) { }

    ngOnInit(): void {
        this.congeService.getCurrentConge().subscribe(
          (conges: any[]) => {
            this.conges = conges;
            this.renderCalendar();
          },
          error => {
            console.error('Error fetching current conges:', error);
          }
        );
      }
      renderCalendar(): void {
        const calendarEl = document.getElementById('calendar');
    
        this.calendar = new Calendar(calendarEl, {
          plugins: [dayGridPlugin], // Include DayGrid plugin here
          initialView: 'dayGridMonth', // Set the initial view
          events: this.mapCongesToEvents(),
          eventColor: '#3788d8', // Map conges to FullCalendar events
          eventClick: this.handleEventClick.bind(this)
        });
    
        this.calendar.render();
      }
      mapCongesToEvents(): any[] {
        return this.conges.map(conge => {
          return {
            title: `${conge.user.username} - ${conge.typeConge}`, 
            start: conge.dateDebut, 
            end: conge.dateFin ,
            color: conge.typeConge === 'Maladie' ? '#30c92a' : '#4aadd4',
            id : conge.idCong,
            conge: {
              idCong: conge.idCong,
              dateDebut: conge.dateDebut,
              dateFin: conge.dateFin,
              typeConge: conge.typeConge,
              duree: conge.duree,
              user: conge.user
            }
          };
        });
      }
      handleEventClick(clickInfo: any): void {
         const selectedConge = clickInfo.event.extendedProps.conge;
        const dialogRef = this.dialog.open(CongeDetailsModalComponent, {
          width: '400px',
          data: { conge: selectedConge }
        });
      
        dialogRef.afterClosed().subscribe(result => {
          // Handle result if needed
        });
      }


      openAddCongeModal(): void {
        const dialogRef = this.dialog.open(AddCongeModalComponent, {
          width: '400px', // Adjust width as needed
        });
    
        dialogRef.afterClosed().subscribe(result => {
          // Handle result if needed
        });
      }
}

/*import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjetsService} from '../../_services/project.service';
import {CalendarOption} from '@fullcalendar/angular/private-types';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit{
  @ViewChild('calendar') calendarComponent: CalenderComponent;

  calendarOptions: CalendarOption<any> = {};

  constructor(private projetService: ProjetsService) { }

  ngOnInit(): void {
    this.projetService.getProjetByDateRange().subscribe(projets => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        events: projets.map(projet => ({
          title: projet.projetTitle,
          start: projet.dateDebut,
          end: projet.dateFin
        }))
      };
    });
  }
}
*/

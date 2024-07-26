import { Component, OnDestroy, ViewChild } from '@angular/core';
import { TicketService } from 'src/app/_services/tickets.service';
import { MatDialog } from '@angular/material/dialog';
import { Tickets } from 'src/app/_models/Tickets';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_models';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserlistService } from 'src/app/admin/table-list/userlist.service';
import { EditticketlistComponent } from 'src/app/admin/editticketlist/editticketlist.component';
import { TicketdetailsComponent } from 'src/app/admin/ticketdetails/ticketdetails.component';
import { AddTicketlistComponent } from 'src/app/admin/addticketlist/addticketlist.component';
@Component({
  selector: 'app-ticketlistu',
  templateUrl: './ticketlistu.component.html',
  styleUrls: ['./ticketlistu.component.css']
})
export class TicketlistuComponent implements OnDestroy {
  tickets: Tickets[] = [];
  assignedUserNames: { [ticketId: number]: string } = {};
  private userSubscriptions: Subscription[] = [];
  searchTerm: string = '';
  sortedByDate: boolean = false; // Variable to track the sorting 
  pageSize: number = 10; // Nombre d'éléments par page
  currentPage: number = 0; // Page actuelle
  pagedTickets: Tickets[] = []; // Tickets affichés sur la page actuelle
  private ticketSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  constructor(
    private ticketService: TicketService,
    private dialog: MatDialog,
    private userService: UserlistService
  ) {}

  ngOnDestroy(): void {
    this.userSubscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.loadTickets();
  }
  updatePage() {
    // Filtrer les tickets sur la base du terme de recherche
    const filteredTickets = this.filterTickets();
    
    // Calculer l'index de départ en fonction de la pagination
    const startIndex = this.currentPage * this.pageSize;
  
    // Extraire les tickets à afficher sur la page actuelle
    this.pagedTickets = filteredTickets.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
  }

  loadTickets() {
    this.ticketService.getAllTickets().subscribe(tickets => {
      // Assigner les tickets récupérés
      this.tickets = tickets;
  
      // Si les tickets ne sont pas déjà triés par date assignée, triez-les
      if (!this.sortedByDate) {
        this.sortTicketsByDate();
      }
  
      // Mettre à jour la page après avoir chargé les tickets
      this.updatePage();
    });
  }

  // Méthode pour trier les tickets par date assignée
  sortTicketsByDate() {
    this.tickets.sort((a, b) => {
      // Convertir les dates assignées en objets Date pour la comparaison
      const dateA = new Date(a.dateAssigned);
      const dateB = new Date(b.dateAssigned);
  
      // Comparer les dates assignées dans l'ordre inverse pour trier du plus récent au plus ancien
      return dateB.getTime() - dateA.getTime();
    });
  
    // Mettre à jour l'état de tri
    this.sortedByDate = true;
  }

  // Autres méthodes de votre composant...

  editTicket(ticketId: number) {
    const dialogRef = this.dialog.open(EditticketlistComponent, {
      width: '50%',
      data: {
        ticketId: ticketId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadTickets();
      }
    });
  }

  deleteTicket(ticketId: number) {
    if (confirm("Are you sure you want to delete this ticket?")) {
      this.ticketService.deleteTicketById(ticketId).subscribe(() => {
        this.loadTickets();
      });
    }
  }

  openTicketDetails(ticket: Tickets) {
    const dialogRef = this.dialog.open(TicketdetailsComponent, {
      width: '70%', // Taille de la fenêtre contextuelle
      data: ticket // Passer les données du ticket au composant des détails du ticket
    });
  }

  openAddTicket(enteranimation: any, exitanimation: any, code: any) {
    const dialogRef = this.dialog.open(AddTicketlistComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '50%',
      data: {
        empcode: code
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadTickets();
      }
    });
  }

  getProjectTitle(ticket: Tickets): string {
    return ticket.user && ticket.user.name ? ticket.user.name : 'user inconnu';
  }

  filterTickets(): Tickets[] {
    return this.tickets.filter(ticket =>
      ticket.idTicket.toString().includes(this.searchTerm) ||
      ticket.ticketPriority.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      ticket.ticketContent.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      ticket.dateAssigned.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      ticket.ticketStatus.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      ticket.tickettitle.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      this.getProjectTitle(ticket).toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

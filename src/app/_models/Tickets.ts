import { User } from "./user";

export class Tickets {
    idTicket: number;
    ticketPriority: string;
    ticketContent: string;
    dateAssigned: Date;
    ticketStatus: string = 'Open'; // Initialiser le statut à "Open"
    tickettitle: string;
    
    user!: User; // Mettez à jour pour stocker le nom de l'utilisateur affecté
  }
export enum TicketPriority {
    Critical = 'Critical',
    High = 'High',
    Medium = 'Medium',
    Low = 'Low'
}

export enum TicketStatus {
    Open = 'Open',
    InProgress = 'InProgress',
    Resolved = 'Resolved',
    Closed = 'Closed',
    Cancelled = 'Cancelled'
}

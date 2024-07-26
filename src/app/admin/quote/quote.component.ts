import {Component, OnInit, ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Quote } from '../../_models/quote';
import { QuoteService } from '../../_services/quote.service';
import {MatDialog} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
   // @ViewChild('addQuoteModal') addQuoteModal: any; // Définir la référence au modèle modal d'ajout de devis
    // @ViewChild('editQuoteModal') editQuoteModal: any;
    //quotes: any[];
    quotes: Quote[] = [];
  newQuote: Quote = new Quote();
  selectedQuote: Quote = new Quote();
    currentPage: number = 0;
    pageSize: number = 5;
    pagedQuotes: Quote[] = [];
    isValid: boolean = true;
    year: number = 2024;



    constructor(private dialog: MatDialog, private modalService: NgbModal, private quoteService: QuoteService) { }

  ngOnInit(): void {
    this.getAllQuotes();
  }

    getQuotes(): void {
        this.quoteService.getQuotesByValidationAndYear(this.isValid, this.year)
            .subscribe(quotes => this.quotes = quotes);
    }
    getAllQuotes(): void {
        this.quoteService.getAllQuotes().subscribe(
            (data: Quote[]) => {
                this.quotes = data;
                this.updatePage(); // Appel de la méthode pour mettre à jour les citations paginées
            },
            (error: any) => {
                console.error('Error fetching quotes:', error);
            }
        );
    }

    onPageChange(event: PageEvent) {
        this.currentPage = event.pageIndex;
        this.pageSize = event.pageSize;
        this.updatePage();
    }

    updatePage() {
        const startIndex = this.currentPage * this.pageSize;
        this.pagedQuotes = this.quotes.slice(startIndex, startIndex + this.pageSize);
    }

    openEditModal(quote: Quote): void {
        this.selectedQuote = { ...quote };
        this.modalService.open( { ariaLabelledBy: 'editQuoteModalLabel' });
    }
    toggleQuoteValidity(quote: Quote) {
        quote.valid = !quote.valid;

        this.quoteService.validateQuote(quote.idQuote, quote.valid).subscribe(
            () => {
                console.log('Validation successful');
            },
            (error) => {
                console.error('Validation failed:', error);
            }
        );
    }


    saveQuote(): void {
        this.quoteService.addQuote(this.newQuote).subscribe(
            (response: Quote) => {
                console.log('Quote saved:', response);
                this.modalService.dismissAll(); // Fermer le modèle modal d'ajout de devis après sauvegarde réussie
                this.newQuote = new Quote(); // Réinitialiser le nouvel objet de devis
                this.getAllQuotes();
            },
            (error: any) => {
                console.error('Error saving quote:', error);
            }
        );
    }

    validate(id: number, isValid: boolean): void {
        this.quoteService.validateQuote(id, isValid).subscribe(
            () => {
                console.log('Validation successful');
                // Mettez à jour l'interface utilisateur ou affichez un message de réussite
            },
            (error) => {
                console.error('Validation failed:', error);
                // Affichez un message d'erreur à l'utilisateur
            }
        );
    }

    updateQuote(): void {
        this.quoteService.updateQuote(this.selectedQuote.idQuote, this.selectedQuote).subscribe(
            (response: Quote) => {
                console.log('Quote updated:', response);
                this.getAllQuotes(); // Rafraîchir la liste des devis
                this.modalService.dismissAll(); // Fermer le modèle modal d'édition de devis après mise à jour réussie
            },
            (error: any) => {
                console.error('Error updating quote:', error);
            }
        );
    }


    deleteQuote(id: number): void {
    if (confirm('Are you sure you want to delete this quote?')) {
      this.quoteService.deleteQuote(id).subscribe(
          () => {
              this.getAllQuotes(); // Rafraîchir la liste des devis
              console.log('Quote deleted:', id);
            // Implémentez le reste de la logique pour supprimer un devis
          },
          (error: any) => {
            console.error('Error deleting quote:', error);
          }
      );
    }
  }

  openAddQuoteModal(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'addQuoteModalLabel' });
  }

}

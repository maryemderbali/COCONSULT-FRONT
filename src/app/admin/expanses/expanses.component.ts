import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Expanses } from '../../_models/expanses';
import { ExpansesService } from '../../_services/expanses.service';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-expanses',
    templateUrl: './expanses.component.html',
    styleUrls: ['./expanses.component.css']
})
export class ExpansesComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    expansesList: Expanses[] = [];
    newExpense: Expanses = new Expanses();
    selectedExpense: Expanses = new Expanses();
    searchTerm: string = '';
    currentPage: number = 0;
    pagedExpenses: Expanses[] = [];
    private expansesSubscription: Subscription;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    totalExpenses: number = 0;
    pageSize: number = 5;

    constructor(private modalService: NgbModal, private expansesService: ExpansesService) { }

    ngOnInit(): void {
        this.getAllExpenses();
    }



    getAllExpenses(): void {
        this.expansesSubscription = this.expansesService.getAllExpanses().subscribe(expenses => {
            this.expansesList = expenses;
            this.totalExpenses = this.expansesList.length;
            this.updatePage();
        });
    }

    saveExpense(): void {
        this.expansesService.addExpanse(this.newExpense).subscribe(
            (response: Expanses) => {
                console.log('Expense saved:', response);
                this.modalService.dismissAll();
                this.newExpense = new Expanses();
                this.getAllExpenses();
            },
            (error: any) => {
                console.error('Error saving expense:', error);
            }
        );
    }

    editExpense(expense: Expanses): void {
        this.selectedExpense = expense;
        // Open edit modal if needed
    }

    updateExpense(): void {
        this.expansesService.updateExpanse(this.selectedExpense.idExps, this.selectedExpense).subscribe(
            () => {
                console.log('Expense updated successfully.');
                this.getAllExpenses();
                this.modalService.dismissAll();
            },
            (error: any) => {
                console.error('Error updating expense:', error);
            }
        );
    }

    deleteExpense(id: number): void {
        if (confirm('Are you sure you want to delete this expense?')) {
            this.expansesService.deleteExpanse(id).subscribe(
                () => {
                    console.log('Expense deleted successfully.');
                    this.getAllExpenses();
                },
                (error: any) => {
                    console.error('Error deleting expense:', error);
                }
            );
        }
    }

    onPageChange(event: PageEvent): void {
        this.currentPage = event.pageIndex;
        this.pageSize = event.pageSize;
        this.updatePage();
    }

    updatePage(): void {
        const startIndex = this.currentPage * this.pageSize;
        this.pagedExpenses = this.expansesList.slice(startIndex, startIndex + this.pageSize);
    }

    openAddExpenseModal(content: any): void {
        this.modalService.open(content, { ariaLabelledBy: 'addExpenseModalLabel' });
    }

    filterExpenses(): Expanses[] {
        return this.expansesList.filter(expense =>
            expense.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            expense.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }
}

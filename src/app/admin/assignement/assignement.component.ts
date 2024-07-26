import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Assignements } from '../../_models/assignements';
import { AssignementsService } from '../../_services/assignements.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-assignments',
    templateUrl: './assignement.component.html',
    styleUrls: ['./assignement.component.css']
})
export class AssignmentsComponent implements OnInit {
    assignments: Assignements[] = [];
    newAssignment: Assignements = new Assignements();
    selectedAssignment: Assignements = new Assignements();
    currentPage: number = 0;
    pagedAssignments: Assignements[] = [];
    searchTerm: string = '';
    totalAssignments: number = 5;
    pageSize: number = 5;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    constructor(private modalService: NgbModal, private assignmentsService: AssignementsService) { }

    ngOnInit(): void {
        this.getAllAssignments();
    }

    getAllAssignments(): void {
        this.assignmentsService.getAllAssigns().subscribe(
            (assignments: Assignements[]) => {
                this.assignments = assignments;
                this.totalAssignments = this.assignments.length;
                this.updatePage();
            },
            (error: any) => {
                console.error('Error fetching assignments:', error);
            }
        );
    }

    saveAssignment(): void {
        this.assignmentsService.addAssign(this.newAssignment).subscribe(
            (response: Assignements) => {
                console.log('Assignment saved:', response);
                this.modalService.dismissAll();
                this.newAssignment = new Assignements(); // Reset newAssignment object
                this.getAllAssignments(); // Refresh assignment list
            },
            (error: any) => {
                console.error('Error saving assignment:', error);
            }
        );
    }

    openEditModal(assignment: Assignements): void {
        this.selectedAssignment = assignment;
        // Open the edit modal here
    }

    updateAssignment(): void {
        this.assignmentsService.updateAssign(this.selectedAssignment.idAssign, this.selectedAssignment).subscribe(
            (response: Assignements) => {
                console.log('Assignment updated:', response);
                // Optionally, dismiss modal and refresh assignment list here
                // this.modalService.dismissAll();
                // this.getAllAssignments();
            },
            (error: any) => {
                console.error('Error updating assignment:', error);
            }
        );
    }

    deleteAssignment(id: number): void {
        if (confirm('Are you sure you want to delete this assignment?')) {
            this.assignmentsService.removeAssign(id).subscribe(
                () => {
                    console.log('Assignment deleted:', id);
                    this.getAllAssignments(); // Refresh assignment list
                },
                (error: any) => {
                    console.error('Error deleting assignment:', error);
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
        this.pagedAssignments = this.assignments.slice(startIndex, startIndex + this.pageSize);
    }

    filterAssignments(): Assignements[] {
        return this.assignments.filter(assignment =>
            assignment.idAssign.toString().includes(this.searchTerm) ||
            assignment.timeRecording.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            assignment.expenses.toString().includes(this.searchTerm.toLowerCase())
        );
    }

    openAddAssignmentModal(content: any): void {
        this.modalService.open(content, { ariaLabelledBy: 'addAssignmentModalLabel' });
    }

    openEditAssignmentModal(content: any): void {
        this.modalService.open(content, { ariaLabelledBy: 'editAssignmentModalLabel' });
    }
}

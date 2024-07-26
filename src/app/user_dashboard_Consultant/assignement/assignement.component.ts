import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Assignements } from '../../_models/assignements';
import { AssignementsService } from '../../_services/assignements.service';
import { PageEvent } from '@angular/material/paginator';
import { Projects } from '../../_models/projects';
import {Router} from '@angular/router';


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
    projects: Projects[] = []; // Déclaration de la propriété projects
    selectedProjectId: number | null = null; // Déclaration de la propriété selectedProjectId



    constructor(private modalService: NgbModal,
                private assignmentsService: AssignementsService,
                private router: Router
) { }

    ngOnInit(): void {
        this.getAllProjects();
        this.loadAssignements();
    }
    loadAssignements() {
        // Appel au service pour récupérer la liste des assignements
        this.assignmentsService.getAllAssigns()
            .subscribe((assignements) => {
                this.assignments = assignements;
            }, (error) => {
                console.error('Erreur lors du chargement des assignements : ', error);
            });
    }
    createAssignmentsForProjects() {
        if (this.selectedProjectId) {
            this.assignmentsService.createAssignement(this.selectedProjectId, this.newAssignment)
                .subscribe(response => {
                    console.log(`Assignement créé avec succès pour le projet ${this.selectedProjectId}: `, response);
                }, error => {
                    console.error(`Erreur lors de la création de l'assignement pour le projet ${this.selectedProjectId}: `, error);
                });
        } else {
            console.error('Aucun projet sélectionné.');
        }
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
    getAllProjects(): void {
        this.assignmentsService.getAllProjects().subscribe(
            (projects: Projects[]) => {
                this.projects = projects;
            },
            (error: any) => {
                console.error('Error fetching projects:', error);
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
            assignment.timeRecording ||
            assignment.expenses.toString().includes(this.searchTerm.toLowerCase())
        );
    }

    openAddAssignmentModal(content: any): void {
        this.modalService.open(content, { ariaLabelledBy: 'addAssignmentModalLabel' });
    }

    openEditAssignmentModal(content: any): void {
        this.modalService.open(content, { ariaLabelledBy: 'editAssignmentModalLabel' });
    }
    redirectToProjectDetails(projectId: number) {
        this.router.navigate(['./projects/project-details', projectId]);
    }
}

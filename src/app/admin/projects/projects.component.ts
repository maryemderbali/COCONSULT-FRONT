import {Component, OnInit, ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Projects } from '../../_models/projects';
import {ProjetsService} from '../../_services/project.service';
import {ProjFeed} from '../../_models/projectFeed';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import {Quote} from '../../_models/quote';
import { single } from 'rxjs/operators';
import * as Chart from 'chart.js';




@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  //@ViewChild('editProjectModal') editProjectModal: any; // Définir la référence au modèle modal d'édition de projet
  //@ViewChild('addProjectModal') addProjectModal: any; // Définir la référence au modèle modal d'ajout de projet
   // @ViewChild(MatPaginator) paginator: MatPaginator;
    projects: Projects[] = [];
    totalProjects: number = 5;
    searchTerm: string = '';
    pageSize: number = 5;
    currentPage: number = 0;
    pagedProjects: Projects[] = [];
    pageSizeOptions: number[] = [5, 10, 25, 100];
    newProject: Projects = new Projects();
    selectedProject: Projects = new Projects();




    constructor(
        private dialog: MatDialog, private modalService: NgbModal,
        private projectService: ProjetsService,
        private router: Router)
    {}


    ngOnInit(): void {
        this.getAllProjects();

    }


    openAddUpdateProjectForm() {
        const dialogRef = this.dialog.open(ProjectsComponent);
        dialogRef.afterClosed().subscribe((val) => {
            if (val) {
                this.getAllProjects();
            }
        });
    }
    fetchProjets(startDate: Date, endDate: Date): void {
       this.projectService.getProjetsByDateRange(startDate, endDate)
            .subscribe(
                (data) => {
                    this.projects = data;
                    console.log('Projects:', this.projects);
                },
                (error) => {
                    console.error('Error fetching projects:', error);
                }
            );
    }

    saveProject(): void {
        this.projectService.addProjets(this.newProject).subscribe(
            (response: Projects) => {
                console.log('Project saved:', response);
                this.modalService.dismissAll();
                this.newProject = new Projects(); // Reset newProject object
                this.getAllProjects(); // Refresh project list
            },
            (error: any) => {
                console.error('Error saving project:', error);
            }

        );
        window.close();

    }
    openEditForm(data: Projects) {
        const dialogRef = this.dialog.open(ProjectsComponent, {
            data,
        });

        dialogRef.afterClosed().subscribe((val) => {
            if (val) {
                this.getAllProjects();
            }
        });
    }
    /*validerProjet(idProject: number): void {
        this.projectService.validateProject(idProject).subscribe(
            () => {
                console.log('Le projet a été validé avec succès.');
                // Traitez les actions supplémentaires après la validation du projet si nécessaire
            },
            error => {
                console.error('Une erreur s\'est produite lors de la validation du projet : ', error);
            }
        );
    }*/
    toggleProjectValidity(projects: Projects) {
        projects.isvalid = !projects.isvalid;

        this.projectService.validateProject(projects.idProjet, projects.isvalid).subscribe(
            () => {
                console.log('Validation successful');
            },
            (error) => {
                console.error('Validation failed:', error);
            }
        );
    }
   /* validerProjet(idProjet: number, isValid: boolean): void {
        this.projectService.validateProject(idProjet, isValid).subscribe(
            () => {
                console.log('Validation successful');
            },
            (error) => {
                console.error('Validation failed:', error);
            }
        );
    }*/

    /*validerProjet(idProjet: number, isvalid : boolean): void {

        this.projectService.validateProject(idProjet,isvalid).subscribe(
            () => {
                const projetIndex = this.pagedProjects.findIndex(project => project.idProjet === idProjet);
                if (projetIndex !== -1) {
                    this.pagedProjects[projetIndex].isvalid;
                }
                // Afficher un message de réussite ou effectuer d'autres actions nécessaires
                console.log('Project validated successfully', 'Success');
            },
            (error) => {
                // Afficher un message d'erreur en cas d'échec de la validation
                console.log('An error occurred while validating the project', 'Error');
                console.error('Error validating project:', error);
            }
        );
    }*/

    openEditModal(project: Projects): void {
        // Pré-remplir les champs du formulaire avec les valeurs du projet feed sélectionné
        this.selectedProject = { ...project }; // Utilisez une copie pour éviter de modifier directement l'objet original
        // Ouvrir le modal d'édition
        this.modalService.open({ ariaLabelledBy: 'editProjectModalLabel' });
    }


    deleteProject(projectId: number) {
        this.projectService.deleteProjets(projectId).subscribe({
            next: (res) => {
                this.getAllProjects();
            },
            error: console.error,
        });
    }

    updatePage() {
        const filteredProjects = this.filterProjects();
        const startIndex = this.currentPage * this.pageSize;
        this.pagedProjects = filteredProjects.slice(startIndex, startIndex + this.pageSize);
    }
    /*navigateToProjectDetails(projectId: number) {
        this.router.navigate(['/admin/project-details', projectId]);
    }*/
    showProjectDetails(projectId: number) {
        // Naviguer vers la page de détails du projet avec l'ID du projet en tant que paramètre
        this.router.navigate(['/admin/project-details', projectId]);
    }

    onPageChange(event: PageEvent) {
        this.currentPage = event.pageIndex;
        this.pageSize = event.pageSize;
        this.updatePage();
    }

    /*loadProjects() {
        this.projectService.getAllProjets().subscribe(projects => {
            this.projects = projects;
            this.updatePage();
        });
    }*/
    getAllProjects(): void {
        this.projectService.getAllProjets().subscribe(
            (data: Projects[]) => {
                this.projects = data;
                this.updatePage();


            },
            (error: any) => {
                console.error('Error fetching quotes:', error);
            }
        );
    }
    updateProject(): void {
        this.projectService.updateProjets(this.selectedProject.idProjet, this.selectedProject).subscribe(
            (response: Projects) => {
                console.log('Project updated:', response);
                this.getAllProjects();
                                                // Fermer
                this.modalService.dismissAll();
            },
            (error: any) => {
                console.error('Error updating project:', error);
            }
        );
    }

    filterProjects(): Projects[] {
        return this.projects.filter(project =>
            project.idProjet.toString().includes(this.searchTerm) ||
            project.projetTitle.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    /*onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            this.projectService.uploadProjectsData(file).subscribe(
                response => {
                    console.log('Projects data uploaded successfully:', response);
                    // Handle success message or any other action
                },
                error => {
                    console.error('Error uploading projects data:', error);
                    // Handle error message or any other action
                }
            );
        }
    }*/
}

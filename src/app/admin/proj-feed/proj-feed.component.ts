import {Component, OnInit, ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjFeed } from '../../_models/projectFeed';
import { ProjFeedService } from '../../_services/projectfeed.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
    selector: 'app-proj-feed',
    templateUrl: './proj-feed.component.html',
    styleUrls: ['./proj-feed.component.css']
})
export class ProjFeedComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    projFeeds: ProjFeed[] = [];
    newProjFeed: ProjFeed = new ProjFeed();
    selectedProjFeed: ProjFeed = new ProjFeed();
    searchTerm: string = '';
    currentPage: number = 0;
    pagedProjFeed: ProjFeed[] = [];
    private projFeedSubscription: Subscription;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    totalProjFeeds: number = 5;
    pageSize: number = 5;

    constructor(private dialog: MatDialog,
                private modalService: NgbModal,
                private projFeedService: ProjFeedService)
                    { }

    gOnDestroy(): void {
        if (this.projFeedSubscription)
        {
            this.projFeedSubscription.unsubscribe();
        }
    }
    ngOnInit(): void {
        this.getAllProjFeeds();
    }

    /*getAllProjFeeds(): void {
        this.projFeedSubscription=this.projFeedService.getAllProjFeeds().subscribe(observableOrNext :this.projFeeds
            (data: ProjFeed[]) => {

                this.projFeeds = this.projFeeds;

                });
        )
    }*/
    getAllProjFeeds() {
        this.projFeedSubscription = this.projFeedService.getAllProjFeeds().subscribe(projFeed => {
            this.projFeeds = projFeed;
            this.updatePage();
        });
    }

    saveProjFeed(): void {
        this.projFeedService.addProjFeed(this.newProjFeed).subscribe(
            (response: ProjFeed) => {
                console.log('Project feed saved:', response);
                this.modalService.dismissAll();
                this.newProjFeed = new ProjFeed(); // Reset newProjFeed object
                this.getAllProjFeeds(); // Refresh project feed list
            },
            (error: any) => {
                console.error('Error saving project feed:', error);
            }
        );
    }
    openEditModal(projFeed: ProjFeed): void {
        // Pré-remplir les champs du formulaire avec les valeurs du projet feed sélectionné
        this.selectedProjFeed = { ...projFeed }; // Utilisez une copie pour éviter de modifier directement l'objet original
        // Ouvrir le modal d'édition
        this.modalService.open( { ariaLabelledBy: 'editProjFeedModalLabel' });
    }


    editProjFeed(projFeed: ProjFeed, content: any): void {
        this.selectedProjFeed = projFeed;
        this.modalService.open(content, { ariaLabelledBy: 'editProjFeedModalLabel' });
    }

   /* updateProjFeed(): void {
        this.projFeedService.updateProjFeed(this.selectedProjFeed.idPjtFeed, this.selectedProjFeed).subscribe(
            (response: ProjFeed) => {
                console.log('Project feed updated:', response);
                // Optionally, you can dismiss modal and refresh project feed list here
                // this.modalService.dismissAll();
                // this.getAllProjFeeds();
            },
            (error: any) => {
                console.error('Error updating project feed:', error);
            }
        );
    }*/
    updateProjFeed(): void {
        this.projFeedService.updateProjFeed(this.selectedProjFeed.idPjtFeed, this.selectedProjFeed).subscribe(
            (response: ProjFeed) => {
                console.log('Project feed updated:', response);
                this.getAllProjFeeds();
                this.modalService.dismissAll(); // fermer
            },
            (error: any) => {
                console.error('Error updating project feed:', error);
            }
        );
    }

    deleteProjFeed(id: number): void {
        if (confirm('Are you sure you want to delete this project feed?')) {
            this.projFeedService.deleteProjFeed(id).subscribe(
                () => {
                    this.getAllProjFeeds(); // Refresh project feed list
                    console.log('Project feed deleted:', id);
                },
                (error: any) => {
                    console.error('Error deleting project feed:', error);
                }
            );
        }
    }

    /*onPageChange(event: any): void {
        this.pageSize = event.pageSize;
    }*/
    updatePage() {
        const filteredProjects = this.filterProjectsfeed();
        const startIndex = this.currentPage * this.pageSize;
        this.pagedProjFeed = filteredProjects.slice(startIndex, startIndex + this.pageSize);
    }

    onPageChange(event: PageEvent) {
        this.currentPage = event.pageIndex;
        this.pageSize = event.pageSize;
        this.updatePage();
    }
    openAddProjFeedModal(content: any): void {
        this.modalService.open(content, { ariaLabelledBy: 'addProjFeedModalLabel' });
    }

    filterProjectsfeed(): ProjFeed[] {
        return this.projFeeds.filter(project =>
            project.idPjtFeed.toString().includes(this.searchTerm) ||
            project.project.projetTitle.includes(this.searchTerm.toLowerCase()) ||
            project.content.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }
}

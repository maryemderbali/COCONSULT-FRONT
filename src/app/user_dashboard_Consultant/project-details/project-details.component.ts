import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ProjetsService} from "../../_services/ProjetsService.service";

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
    projectId: number;
    projectDetails: any;

    constructor(
        private route: ActivatedRoute,
        private projetService: ProjetsService
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.projectId = +params.get('projectId'); // Convertir l'identifiant en nombre
            this.getProjectDetails(this.projectId);
        });
    }

    toggleProjectValidity(valid: boolean) {
        if (this.projectDetails) {
            this.projetService.validateProject(this.projectDetails.idProjet, valid)
                .subscribe(
                    () => {
                        console.log('Project validation toggled successfully');
                        this.getProjectDetails(this.projectDetails.idProjet); // Rafraîchir les détails du projet après validation
                        location.reload(); // Recharger la page pour afficher les changements
                    },
                    error => {
                        console.error('Error toggling project validation:', error);
                    }
                );
        } else {
            console.error('Project details is not available');
        }
    }

    getProjectDetails(idProjet: number): void {
        this.projetService.getProjetsById(idProjet).subscribe(
            (data: any) => {
                this.projectDetails = data;
                // Mettre à jour les détails du projet dans l'interface utilisateur
            },
            (error) => {
                console.error('Error fetching project details:', error);
            }
        );
    }

}

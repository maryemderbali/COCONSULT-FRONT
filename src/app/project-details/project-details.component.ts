import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ProjetsService} from '../_services/project.service';

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

 /* getProjectDetails(): void {
    this.projetService.getProjetsById(this.projectId).subscribe(
        (data: any) => {
          this.projectDetails = data;
        },
        (error) => {
          console.error('Error fetching project details:', error);
        }
    );
  }*/
  getProjectDetails(idProjet: number): void {
    this.projetService.getProjetsById(idProjet).subscribe(
        (data: any) => {
          this.projectDetails = data;
          // Vous pouvez accéder à la propriété 'valid' du projet ici pour afficher son état de validation
        },
        (error) => {
          console.error('Error fetching project details:', error);
        }
    );
  }

}

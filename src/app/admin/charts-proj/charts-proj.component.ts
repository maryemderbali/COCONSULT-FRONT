import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { ProjetsService } from '../../_services/project.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts-proj.component.html',
  styleUrls: ['./charts-proj.component.css']
})
export class ChartsProjComponent implements OnInit {
  @ViewChild('projectCountsChart') projectCountsChart: ElementRef<HTMLCanvasElement>;
  @ViewChild('projectDurationsChart') projectDurationsChart: ElementRef<HTMLCanvasElement>;

  constructor(private projectService: ProjetsService) { }

  ngOnInit(): void {
    this.getProjectCountsByTitle(); // Récupérez les données lors de l'initialisation du composant
    this.getProjectDurations(); // Récupérez les données de durée lors de l'initialisation du composant
  }

  getProjectCountsByTitle(): void {
    this.projectService.getProjectCountsByTitle().subscribe((data: any[]) => {
      const projectTitles = Object.keys(data); // Titres de projet
      const projectCounts = Object.values(data).map(value => +value); // Nombre de projets par titre

      this.initializePieChart(this.projectCountsChart.nativeElement, 'Project Counts', projectTitles, projectCounts);
    });
  }

  getProjectDurations(): void {
    this.projectService.getProjectDurations().subscribe((data: any[]) => {
      const projectTitles = Object.keys(data); // Titres de projet
      const projectDurations = Object.values(data).map(value => +value); // Durée des projets par titre

      this.initializeLineChart(this.projectDurationsChart.nativeElement, 'Project Durations', projectTitles, projectDurations);
    });
  }

  initializePieChart(canvas: HTMLCanvasElement, title: string, labels: string[], data: number[]): void {
    new Chart(canvas, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: title,
          data: data,
          backgroundColor: this.generateRandomColors(data.length), // Générez des couleurs aléatoires
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: title
          }
        }
      }
    });
  }

  initializeLineChart(canvas: HTMLCanvasElement, title: string, labels: string[], data: number[]): void {
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: title,
          data: data,
          fill: false,
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: title
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Project Titles'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Project Durations'
            }
          }
        }
      }
    });
  }


  generateRandomColors(numColors: number): string[] {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16); // Génère une couleur hexadécimale aléatoire
      colors.push(randomColor);
    }
    return colors;
  }
}

import { Component, OnInit } from '@angular/core';
import { SolutionService } from './solution.service';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnInit {

  solutions: any[] = [];
  foodSolutions: any[] = [];
  workSolutions: any[] = [];
  transportSolutions: any[] = [];
  resourcesSolutions: any[] = [];

  constructor(private SolutionService: SolutionService) {}

  ngOnInit(): void {
    this.loadSolutions();

  }

  loadSolutions(): void {
    this.SolutionService.getSolutionList().subscribe((data: any[]) => {
      this.solutions = data;

      this.foodSolutions = this.solutions.filter((solution) => solution.titre === 'food');
      this.workSolutions = this.solutions.filter((solution) => solution.titre === 'work');
      this.transportSolutions = this.solutions.filter((solution) => solution.titre === 'transport');
      this.resourcesSolutions = this.solutions.filter((solution) => solution.titre === 'resources');
    });
  }
  refreshData(): void {
    this.loadSolutions();
  }
}
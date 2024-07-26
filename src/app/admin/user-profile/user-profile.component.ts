import { Component, OnInit } from '@angular/core';
import { Solution } from './solution';

import{solutionService} from './solution.service'; 

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  solution: Solution=new Solution();

  constructor(private solutionService :solutionService) { }

  ngOnInit() {
  }

  saveSolution(){
    this.solutionService.createSolution(this.solution).subscribe( data =>{
    console.log(data);
    window.location.reload();
    },
    error => console.log(error));

    }

}

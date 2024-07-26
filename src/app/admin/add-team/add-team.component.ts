import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Team } from 'src/app/_models/Team';
import { TeamService } from 'src/app/_services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  teamForm!: FormGroup;
  teamAdded: EventEmitter<Team> = new EventEmitter<Team>();

  constructor(
    private teamService: TeamService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddTeamComponent>
  ) {}

  ngOnInit(): void {
    this.teamForm = this.formBuilder.group({
      capacity: ['', Validators.required],
      teamLeader: ['', Validators.required],
      teamName: ['', Validators.required]
    });
  }

  addTeam() {
    if (this.teamForm.valid) {
      const capacity = this.teamForm.value.capacity;
      const teamLeader = this.teamForm.value.teamLeader;
      const teamName = this.teamForm.value.teamName;

      const newTeam: Team = {
        capacity: capacity,
        teamLeader: teamLeader,
        teamName: teamName
      };

      this.teamService.addTeam(newTeam).subscribe(team => {
        this.teamAdded.emit(team);
        this.dialogRef.close(team);
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamService } from 'src/app/_services/team.service';
import { Team } from 'src/app/_models/Team';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  teamForm!: FormGroup;
  teamId: number;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditTeamComponent>,
    private teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.teamId = data.teamId;
  }

  ngOnInit(): void {
    this.teamForm = this.formBuilder.group({
      teamName: ['', Validators.required],
      teamLeader: ['', Validators.required],
      capacity: ['', Validators.required]
    });

    this.loadTeamDetails(this.teamId);
  }

  loadTeamDetails(teamId: number) {
    this.teamService.getTeamById(teamId).subscribe(team => {
      this.teamForm.patchValue({
        teamName: team.teamName,
        teamLeader: team.teamLeader,
        capacity: team.capacity
      });
    });
  }

  updateTeam() {
    if (this.teamForm.valid) {
      const updatedTeam: Team = this.teamForm.value;
      this.teamService.editTeamById(this.teamId, updatedTeam).subscribe(() => {
        this.dialogRef.close('success');
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

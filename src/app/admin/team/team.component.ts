import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Team } from 'src/app/_models/Team';
import { TeamService } from 'src/app/_services/team.service';
import { EditTeamComponent } from '../edit-team/edit-team.component';
import { AddTeamComponent } from '../add-team/add-team.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnDestroy {
  teams: Team[] = [];
  searchTerm: string = '';
  pageSize: number = 10;
  currentPage: number = 0;
  pagedTeams: Team[] = [];

  constructor(
    private teamService: TeamService,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams() {
    this.teamService.getAllTeams().subscribe(teams => {
      this.teams = teams;
      this.updatePage();
    });
  }

  updatePage() {
    const filteredTeams = this.filterTeams();
    const startIndex = this.currentPage * this.pageSize;
    this.pagedTeams = filteredTeams.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
  }

  filterTeams(): Team[] {
    return this.teams.filter(team =>
      team.idTeam.toString().includes(this.searchTerm) ||
      team.teamName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      team.teamLeader.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteTeam(teamId: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette équipe ?")) {
      this.teamService.deleteTeamById(teamId).subscribe(() => {
        // Rechargez la liste des équipes après la suppression avec succès
        this.loadTeams();
      });
    }
  }

  editTeam(teamId: number) {
    this.dialog.open(EditTeamComponent, {
      width: '50%',
      data: { teamId: teamId }
    });
  }
  openAddTeamDialog() {
    this.dialog.open(AddTeamComponent, {
      width: '50%',
    });
  }
}

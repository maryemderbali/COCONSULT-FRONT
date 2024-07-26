import { Component, OnInit, ViewChild } from '@angular/core';

import { ListeUserAscService } from 'src/app/user_dashboard_CRM/settings/liste-user-asc.service';

import { AddUpdateActivitySalesTeamComponent } from '../add-update-activity-sales-team/add-update-activity-sales-team.component';
import { SalesActivity, Status } from 'src/app/_models/ActivitySalesTeam';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivitySalesTeamService } from 'src/app/_services/activity-sales-team.service';
import { ActivatedRoute } from '@angular/router';
import { Repertoire } from 'src/app/_models/Repertoire';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  
 
  displayedColumns: string[] = ['repertoire', 'status' ,'heureStart', 'heureEnd', 'description', 'typeAct', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  user:any[];
  data: SalesActivity;
  activitySalesTeamProspecting: SalesActivity[] = [];
  activitySalesTeamNegotiation: SalesActivity[] = [];
  activitySalesTeamClosing: SalesActivity[] = []; 
  selectedTab: string = '';
  
  repertoire: Repertoire[] = [];
  

  constructor( private _dialog: MatDialog, private activityService: ActivitySalesTeamService, private route: ActivatedRoute) {}
 
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllSalesActivities(); 
  
    this.route.fragment.subscribe(fragment => {
      this.selectedTab = fragment || 'Prospecting';
      this.loadActivitySalesTeamByClass(this.selectedTab);
    });

  }

  
  openAddUpdateActivitySalesTeamForm() {
    const dialogRef = this._dialog.open(AddUpdateActivitySalesTeamComponent);
    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        
        //this.loadActivitySalesTeamByClass();
        console.log('Success');
      }
    });
  }


  
  openEditForm(data: SalesActivity) {
    const dialogRef = this._dialog.open(AddUpdateActivitySalesTeamComponent, {
      data,
    });
  
    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        // Add your logic here to handle the submitted form data
       console.log('Form data submitted:', formData);
      }
    });
  } 

  

  deleteActivity(id: number): void {
    
    this.activityService.deleteActivitySalesTeam(id).subscribe(() => {
      
      this.getAllSalesActivities(); 
    });
  }

  getAllSalesActivities(): void {
    this.activityService.getAllActivitySalesTeam().subscribe((data: SalesActivity[]) => {
      this.dataSource.data = data;
    });
  } 

  loadActivitySalesTeamByClass(classSalesTeam: string): void {
  this.activityService.getActivitySalesTeamByClass(classSalesTeam)
    .subscribe((data: SalesActivity[]) => {
      if (classSalesTeam === 'Prospecting') {
        this.dataSource.data = this.activitySalesTeamProspecting = data;
      } else if (classSalesTeam === 'Negotiation') {
        this.dataSource.data = this.activitySalesTeamNegotiation = data;
      } else if (classSalesTeam === 'Closing') {
        this.dataSource.data = this.activitySalesTeamClosing = data;
      }
    });
}

// Method to return the background color based on typeAct
getTypeActColor(typeAct: string): string {
  switch(typeAct) {
      case 'REUNION':
          return 'lightblue';
      case 'APPEL_TELEPHONIQUE':
          return 'lightgreen';
      case 'RESUME_APPEL':
          return 'lightcyan';
      case 'MEETING':
          return 'lightcoral';
      case 'CALL_SUMMARY':
          return 'lightsalmon'; // Or any other color you prefer
      default:
          return 'transparent'; // Default color if typeAct doesn't match any case
  }
}

  

// Method to return the background color based on status
getStatusColor(status: string): string {
  switch(status) {
      case 'DONE':
          return 'lightgreen';
      case 'WAITING':
          return 'lightsalmon';
      default:
          return 'transparent'; // Default color if status doesn't match any case
  }
}


openMail() {
  window.location.href = 'mailto:louay.sghaier@esprit.tn';
}

}

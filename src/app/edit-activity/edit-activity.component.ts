import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Activity, ActivityType } from '../_models/Activity';
import { ActivityService } from '../_services/activity.service';


@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {
  activityId!: number;
  activity: Activity = new Activity();

  constructor(
    public dialogRef: MatDialogRef<EditActivityComponent>,
    private activityService: ActivityService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.activity = this.data.activity; // Récupérer l'activité passée depuis les données
  }

  updateActivity() {
    this.activityService.editActivity(this.activity.idActivity, this.activity).subscribe(() => {
      this.dialogRef.close('success'); // Fermer le dialogue avec un indicateur de succès
    });
  }
  loadActivity(id: number) {
    this.activityService.getActivityBayID(id).subscribe(activity => {
      this.activity = activity;
    });
  }
  onCancel() {
    this.dialogRef.close(); // Cette méthode ferme le dialogue sans passer de données.
  }
  taskTypes: string[] = Object.values(ActivityType);
}

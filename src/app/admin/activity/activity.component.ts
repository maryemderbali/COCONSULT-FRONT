import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/_models/Activity';
import { ActivityService } from 'src/app/_services/activity.service';
import { AddactivityComponent } from '../addactivity/addactivity.component';
import { EditActivityComponent } from 'src/app/edit-activity/edit-activity.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit, OnDestroy {
  activities: Activity[] = [];
  pagedActivities: Activity[] = [];
  searchTerm: string = '';
  pageSize: number = 10;
  currentPage: number = 0;
  private activitySubscription: Subscription;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private activityService: ActivityService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadActivities();
  }

  ngOnDestroy(): void {
    this.activitySubscription.unsubscribe();
  }

  loadActivities() {
    this.activitySubscription = this.activityService.getAllActivities().subscribe(activities => {
      this.activities = activities;
      this.updatePage();
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
  }

  updatePage() {
    const startIndex = this.currentPage * this.pageSize;
    this.pagedActivities = this.activities.slice(startIndex, startIndex + this.pageSize);
  }

  editActivity(activityId: number) {
    const dialogRef = this.dialog.open(EditActivityComponent, {
      width: '50%',
      data: {
        activityId: activityId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadActivities();
      }
    });
  }

  deleteActivity(activityId: number) {
    if (confirm("Are you sure you want to delete this activity?")) {
      this.activityService.deleteActivity(activityId).subscribe(() => {
        this.loadActivities();
      });
    }
  }

  openAddActivity(enteranimation: any, exitanimation: any, code: any) {
    const dialogRef = this.dialog.open(AddactivityComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
      data: {
        empcode: code
      }
    });

    dialogRef.afterClosed().subscribe((newActivity: Activity) => {
      if (newActivity) {
        this.loadActivities();
      }
    });
  }

  getProjectTitle(activity: Activity): string {
    return activity.projet && activity.projet.projetTitle ? activity.projet.projetTitle : 'Unknown Project';
  }
}

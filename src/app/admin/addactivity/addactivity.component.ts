import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog';
import { Activity, ActivityType } from '../../_models/Activity';
import { ActivityService } from '../../_services/activity.service';
import { Projets } from '../../_models/project';
import { ProjectService } from '../../_services/project.service';

@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.css']
})
export class AddactivityComponent implements OnInit {
  activities: Activity[] = [];
  activityForm!: FormGroup;
  taskTypes: string[] = Object.values(ActivityType);
  projects: Projets[] = [];
  activityAdded: EventEmitter<Activity> = new EventEmitter<Activity>();

  constructor(
    private activityService: ActivityService, 
    private projectService: ProjectService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    public dialogRef: MatDialogRef<AddactivityComponent>
  ) {}

  ngOnInit(): void {
    this.activityForm = this.formBuilder.group({
      nbreOfTask: ['', [Validators.required, Validators.min(1)]],
      projetTitle: ['', Validators.required],
      tasks: this.formBuilder.array([])
    });

    this.getAllProjects();
    
  }

  getAllProjects() {
    this.projectService.getAllProjets().subscribe(projects => {
      this.projects = projects;
    });
  }

  addActivity() {
    const projetTitle = this.activityForm.value.projetTitle;
    const tasks = this.activityForm.get('tasks') as FormArray;
    
    if (tasks && tasks.controls) { // Vérifiez si 'tasks' et 'controls' existent
      tasks.controls.forEach(task => {
        const newActivity = new Activity();
        newActivity.nbreOfTask = this.activityForm.value.nbreOfTask;
        newActivity.activityContent = task.value.activityContent;
        newActivity.taskType = task.value.taskType;
        const selectedProject = this.projects.find(project => project.projetTitle === projetTitle);
        if (selectedProject) {
          newActivity.projet = selectedProject;
        }
    
        this.activityService.addActivity(newActivity, projetTitle).subscribe(activity => {
          this.activities.push(activity);
          this.router.navigate(['/admin/activity']);
          this.dialogRef.close(activity);
          this.activityAdded.emit(activity);
        });
      });
    }
  }
  onAddTask() {
    const tasks = this.activityForm.get('tasks') as FormArray;
    tasks.push(this.createTaskFormGroup());
  }
  get taskControls() {
    return (this.activityForm.get('tasks') as FormArray)?.controls || [];
  }
  

  createTaskFormGroup() {
    return this.formBuilder.group({
      activityContent: ['', Validators.required],
      taskType: ['', Validators.required]
    });
  }
  

  onCancel() {
    this.dialogRef.close();
  }
}

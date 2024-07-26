import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SalesActivity, Status, TypeSalesActivity } from 'src/app/_models/ActivitySalesTeam';
import { Repertoire } from 'src/app/_models/Repertoire';
import { ActivitySalesTeamService } from 'src/app/_services/activity-sales-team.service';
import { RepertoireService } from 'src/app/_services/repertoire.service';

@Component({
  selector: 'app-add-update-activity-sales-team',
  templateUrl: './add-update-activity-sales-team.component.html',
  styleUrls: ['./add-update-activity-sales-team.component.scss']
})
export class AddUpdateActivitySalesTeamComponent implements OnInit {
  activityForm: FormGroup;
  statusOptions = Object.values(Status);
  typeOptions = Object.values(TypeSalesActivity);
  repertoires: Repertoire[] = []; // Assuming Repertoire model and service are available

  constructor(
    private fb: FormBuilder,
    private salesActivityService: ActivitySalesTeamService ,
    private dialogRef: MatDialogRef<AddUpdateActivitySalesTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SalesActivity,
    private _repertoireService: RepertoireService // Inject RepertoireService

  ) {
    this.activityForm = this.fb.group({
      heureStart: '',
      heureEnd: '',
      description: '',
      typeAct: '',
      status: '',
      repertoireId: '' , 
      classSalesTeam: '' 
    });
  }

  ngOnInit(): void {
    // Assuming you have a service method to fetch repertoires
    this.loadRepertoires();
    if (this.data) {
      this.activityForm.patchValue(this.data);
    }
  }

  // Assuming you have a service method to load repertoires
   loadRepertoires() {
     this._repertoireService.GetAllRepertoire().subscribe(repertoires => {
      this.repertoires = repertoires;
     });
   }

   onFormSubmit() {
    if (this.activityForm.valid) {
      const formData = this.activityForm.value;
      const repertoireId = formData.repertoireId;
      delete formData.repertoireId; // Remove 'repertoireId' from form data before sending
      if (this.data) {
        formData.idActSale = this.data.idActSale;
        this.salesActivityService.updateActivitySalesTeam(formData).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err); 
          }
        });
      } else {
        this.salesActivityService.addActivitySalesTeamAffectRep(formData, repertoireId).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } 
    }
  } 

  
}

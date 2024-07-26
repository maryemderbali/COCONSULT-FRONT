import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Prospect } from 'src/app/_models/Prospect';
import { ProspectService } from 'src/app/_services/prospect.service';

@Component({
  selector: 'app-add-update-prospect',
  templateUrl: './add-update-prospect.component.html',
  styleUrls: ['./add-update-prospect.component.scss']
})
export class AddUpdateProspectComponent implements OnInit {
  prospectForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _prospectService: ProspectService,
    private _dialogRef: MatDialogRef<AddUpdateProspectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Prospect, // Assuming data is of type Prospect
  ) {
    this.prospectForm = this._fb.group({
      idProspect: '',
      name: '',
      email: '',
      numTel: '',
      status: '' ,
      title :''
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.prospectForm.patchValue(this.data);
    }
  }

  onFormSubmit() {
    if (this.prospectForm.valid) {
      const formData = this.prospectForm.value;
      if (this.data) {
        formData.idProspect = this.data.idProspect;
        this._prospectService.updateProspect(formData).subscribe({
          next: () => {
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this._prospectService.addProspect(formData).subscribe({
          next: () => {
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }
}

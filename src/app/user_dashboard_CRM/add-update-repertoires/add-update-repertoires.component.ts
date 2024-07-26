import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RepertoireService } from 'src/app/_services/repertoire.service';
import { CoreService } from '../core.service';
import { Repertoire } from 'src/app/_models/Repertoire';

@Component({
  selector: 'app-add-update-repertoires',
  templateUrl: './add-update-repertoires.component.html',
  styleUrls: ['./add-update-repertoires.component.scss']
})
export class AddUpdateRepertoiresComponent implements OnInit {
  repertoireForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _repertoireService: RepertoireService,
    private _dialogRef: MatDialogRef<AddUpdateRepertoiresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Repertoire, // Assuming data is of type Repertoire
    private _coreService: CoreService
  ) {
    this.repertoireForm = this._fb.group({
      idRepertoire: '',
      contact: '',
      numTel: '',
      email: '',
      typeContact: '', // Updated
      priorite: '' // Updated
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.repertoireForm.patchValue(this.data);
    }
  }

  onFormSubmit() {
    if (this.repertoireForm.valid) {
      const formData = this.repertoireForm.value;
      if (this.data) {
        formData.idRepertoire = this.data.idRepertoire;
        this._repertoireService.updateRepertoire(formData).subscribe({
          next: () => {
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this._repertoireService.addRepertoire(formData).subscribe({
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

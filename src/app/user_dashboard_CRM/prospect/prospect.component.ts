import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Prospect } from 'src/app/_models/Prospect';
import { ProspectService } from 'src/app/_services/prospect.service';
import { CoreService } from '../core.service';
import { AddUpdateProspectComponent } from '../add-update-prospect/add-update-prospect.component';
import { RepertoireService } from 'src/app/_services/repertoire.service';
import { Repertoire } from 'src/app/_models/Repertoire'; // Import necessary types
import { priorite } from 'src/app/_models/priorite';
import { TypeContact } from 'src/app/_models/typeContact';

@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.component.html',
  styleUrls: ['./prospect.component.scss']
})
export class ProspectComponent implements OnInit {
  
  displayedColumns: string[] = ["name", "email", "numTel", "title", "status", "action"];

  dataSource: MatTableDataSource<Prospect> = new MatTableDataSource<Prospect>([]); // Initialize with an empty array

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _prospectService: ProspectService,
    private _coreService: CoreService,
    private _repertoireService: RepertoireService // Inject RepertoireService
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllProspects();
  }

  getAllProspects() {
    this._prospectService.getAllProspects().subscribe((data: Prospect[]) => {
      console.log(data);
      this.dataSource.data = data; // Assign data directly to the dataSource
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddUpdateProspectForm() {
    const dialogRef = this._dialog.open(AddUpdateProspectComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllProspects();
          console.log('Prospect added/updated successfully');
        }
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddUpdateProspectComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllProspects();
        }
      },
    });
  }

  deleteProspect(idProspect: number) {
    this._prospectService.removeProspect(idProspect).subscribe({
      next: (res) => {
        this.getAllProspects();
      },
      error: (err) => {
        console.error(err);
        // Handle error
      }
    });
  }

  createRepertoireFromProspect(prospect: Prospect) {
    const repertoire: Repertoire = {
      // Populate the Repertoire object with data from the Prospect object
      contact: prospect.name,
      email: prospect.email,
      numTel: prospect.Numtel,
      // Assuming default values for other properties like TypeContact and Priorite
      TypeContact: TypeContact.QUALIFIED_LEAD,
      Priorite: priorite.FAIBLE,
      idRepertoire: 0, // Assuming 0 as the default value for idRepertoire
    };

    this._repertoireService.createRepertoireFromProspect(prospect).subscribe({
      next: () => {
        console.log('Repertoire created successfully from Prospect');
        // Optionally, you can reload the list of prospects here
        // this.getAllProspects();
      },
      error: (err) => {
        console.error('Error creating Repertoire from Prospect:', err);
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this._prospectService.uploadProspectsData(file).subscribe(
        response => {
          console.log('Prospects data uploaded successfully:', response);
          // Handle success message or any other action
        },
        error => {
          console.error('Error uploading prospects data:', error);
          // Handle error message or any other action
        }
      );
    }
  }

  getStatusColor(status: string): string {
    switch(status) {
        case 'NEW_PROSPECT':
            return 'lightsalmon';
        case 'CONTACTED':
            return 'lightblue';
        case 'QUALIFIED':
            return 'lightgreen';
        case 'UNQUALIFIED':
            return 'lightcoral';
        default:
            return 'transparent'; // Default color if status doesn't match any case
    }
}


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContractService } from 'src/app/_services/contract.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Contract } from 'src/app/_models/Contract';
import { AddUpdateContractComponent } from '../add-update-contract/add-update-contract.component';
import { UploadService } from 'src/app/upload.service';
import { Repertoire } from 'src/app/_models/Repertoire';
import { Etape } from 'src/app/_models/EtapeContract';


@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent implements OnInit {
  repertoire: Repertoire[] = [];
  contract: Contract[] = [];
  searchTerm: string = '';
  currentPage: number = 0;
  pageSize: number = 10;
  pagedContract: Contract[] = [];
  displayedColumns: string[] = ['referenceContract','repertoire', 'description', 'dateContract', 'montant', 'nbreTranche', 'etape', 'action'];
  
  dataSource = new MatTableDataSource<Contract>([]); // Initialize with empty array

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(
    private _dialog: MatDialog,
    private _contractService: ContractService,
    private fileUploadService: UploadService,
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getContractList();
    this.updatePage(); // Initialize pagination
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
  }

  updatePage() {
    //const filteredContract = this.filterContracts(this.searchTerm);
    const startIndex = this.currentPage * this.pageSize;
 //   this.pagedContract = filteredContract.slice(startIndex, startIndex + this.pageSize);
  }

  openAddUpdateContractForm() {
    const dialogRef = this._dialog.open(AddUpdateContractComponent);
    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.getContractList();
        console.log('Success');
      }
    });
  }

  openPdf(description: string): void {
    this.fileUploadService.getPdf(description).subscribe(
      (pdfData) => {
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      },
      (error) => {
        console.error('Failed to fetch PDF:', error);
      }
    );
  }

  getContractList() {
    this._contractService.getAllContracts().subscribe({
        next: (contracts: Contract[]) => {
            // Modify the description of each contract
            contracts.forEach(contract => {
                // Extract filename from description
                const filename = contract.description.split('\\').pop();
                // Update contract description
                contract.description = filename || contract.description;
            });

            // Assign contracts to dataSource
            this.dataSource.data = contracts;
            // Update paginator length
            this.dataSource.paginator.length = this.dataSource.data.length;
        },
        error: console.error,
    });
}




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Update the paginator's length
    this.dataSource.paginator.length = this.dataSource.filteredData.length;

    // Reset the paginator to the first page
    this.dataSource.paginator.firstPage();
  }

  openEditForm(data: Contract) {
    const dialogRef = this._dialog.open(AddUpdateContractComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.getContractList();
      }
    });
  }

  deleteContract(contractId: number) {
    this._contractService.removeContract(contractId).subscribe({
      next: (res) => {
        this.getContractList();
      },
      error: console.error,
    });
  }

  getTotalMontant() {
    if (!this.dataSource) return 0;
    return this.dataSource.data.map((contract: Contract) => contract.montant).reduce((acc, value) => acc + value, 0);
  }

 /* filterContracts(searchTerm: string): Contract[] {
    return this.contract.filter(contract =>
      contract.idContract.toString().includes(searchTerm) ||
      contract.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.dateContract.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.montant.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.nbreTranche.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      this.getEtapeLabel(contract.etape).toLowerCase().includes(searchTerm.toLowerCase()) ||
      this.getRepertoireLabel(contract.repertoire).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }*/

  private getEtapeLabel(etape: Etape): string {
    switch (etape) {
      case Etape.NOUVEAU:
        return 'Nouveau';
      case Etape.DECOUVERTE:
        return 'Découverte';
      case Etape.PROPSITION:
        return 'Proposition';
      case Etape.NEGOCIATION:
        return 'Négociation';
      case Etape.CONCLU:
        return 'Conclu';
      case Etape.PERDU:
        return 'Perdu';
      default:
        return '';
    }
  }

  private getRepertoireLabel(repertoire: Repertoire): string {
    return repertoire.contact; // Utilize the contact field directly
  }

  // Method to return the background color based on étape
getEtapeColor(etape: string): string {
  switch(etape) {
      case 'NOUVEAU':
          return 'lightblue';
      case 'DECOUVERTE':
          return 'lightgreen';
      case 'PROPSITION':
          return 'lightyellow';
      case 'NEGOCIATION':
          return 'lightcoral';
      case 'CONCLU':
          return 'lightsalmon'; // Or any other color you prefer
      case 'PERDU':
          return 'lightpink'; // Or any other color you prefer
      default:
          return 'transparent'; // Default color if étape doesn't match any case
  }
}


}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimeRecord } from '../../_models/timerecord';
import { TimeRecordService } from '../../_services/timerecord.service';

@Component({
  selector: 'app-time-record',
  templateUrl: './time-record.component.html',
  styleUrls: ['./time-record.component.css']
})
export class TimeRecordComponent implements OnInit {

  timeRecords: TimeRecord[] = [];
  newTimeRecord: TimeRecord = new TimeRecord();
  selectedTimeRecord: TimeRecord = new TimeRecord();
  currentPage: number = 0;
  pageSize: number = 5;
  pagedTimeRecords: TimeRecord[] = [];

  constructor(private modalService: NgbModal, private timeRecordService: TimeRecordService) { }

  ngOnInit(): void {
    this.getAllTimeRecords();
  }

  getAllTimeRecords(): void {
    this.timeRecordService.getAllTimeRecords().subscribe(
        (data: TimeRecord[]) => {
          this.timeRecords = data;
          this.updatePage();
        },
        (error: any) => {
          console.error('Error fetching time records:', error);
        }
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
  }

  updatePage(): void {
    const startIndex = this.currentPage * this.pageSize;
    this.pagedTimeRecords = this.timeRecords.slice(startIndex, startIndex + this.pageSize);
  }

  openEditModal(timeRecord: TimeRecord): void {
    this.selectedTimeRecord = { ...timeRecord };
    this.modalService.open({ ariaLabelledBy: 'editTimeRecordModalLabel' });
  }

  saveTimeRecord(): void {
    this.timeRecordService.addTimeRecord(this.newTimeRecord).subscribe(
        (response: TimeRecord) => {
          console.log('Time record saved:', response);
          this.modalService.dismissAll();
          this.newTimeRecord = new TimeRecord();
          this.getAllTimeRecords();
        },
        (error: any) => {
          console.error('Error saving time record:', error);
        }
    );
  }

  /*validate(id: number, isValid: boolean): void {
    this.timeRecordService.validateTimeRecord(id, isValid).subscribe(
        () => {
          console.log('Validation successful');
        },
        (error) => {
          console.error('Validation failed:', error);
        }
    );
  }*/

  updateTimeRecord(): void {
    this.timeRecordService.updateTimeRecord(this.selectedTimeRecord.idTimeRec, this.selectedTimeRecord).subscribe(
        (response: TimeRecord) => {
          console.log('Time record updated:', response);
          this.getAllTimeRecords();
          this.modalService.dismissAll();
        },
        (error: any) => {
          console.error('Error updating time record:', error);
        }
    );
  }

  deleteTimeRecord(id: number): void {
    if (confirm('Are you sure you want to delete this time record?')) {
      this.timeRecordService.removeTimeRecord(id).subscribe(
          () => {
            this.getAllTimeRecords();
            console.log('Time record deleted:', id);
          },
          (error: any) => {
            console.error('Error deleting time record:', error);
          }
      );
    }
  }

  openAddTimeRecordModal(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'addTimeRecordModalLabel' });
  }

}

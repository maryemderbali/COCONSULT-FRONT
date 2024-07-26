import { Component, OnInit } from '@angular/core';
import {notificationService} from './notificationService';
import { Message } from './message';
import { MatDialog } from '@angular/material/dialog';
import { NotifDialogComponent } from './notif-dialog/notif-dialog.component';

declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  message:Message[];
  constructor(private dialog: MatDialog,private notificationService :notificationService ) { }

 
  ngOnInit() {
    this.getMessage();
  }

  private getMessage(){
    this.notificationService.getListMessage().subscribe(data => {
    this.message = data;
    console.log(data);
    });
    }
    
    formatDate(timestamp: number): string {
      // Convert the Unix timestamp to a Date object
      const date = new Date(timestamp);
    
      // Format the date as desired (e.g., "YYYY-MM-DD HH:mm:ss")
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    
      return formattedDate;
    }
    sendNotification(message: Message): void {
      console.log('Sending notification:', message);
      const dialogRef = this.dialog.open(NotifDialogComponent, {
        width: '500px',
        data: message
      });
  
      dialogRef.afterClosed().subscribe(result => {
        // Handle dialog close if needed
        console.log('The dialog was closed');
      });
    }
}

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Message } from '../message';
import { notificationService } from '../notificationService';
@Component({
  selector: 'app-notif-dialog',
  templateUrl: './notif-dialog.component.html',
  styleUrls: ['./notif-dialog.component.css']
})
export class NotifDialogComponent {

  notification: { title: string, message: string } = { title: '', message: '' };
  roles: string[] = ['Manager', 'HR','CRM','Consult','PM']; // Example roles, replace with actual roles
  selectedRoles: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<NotifDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Message,
    private notificationService: notificationService
  ) {
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendNotification(): void {
   // const adminMsgId = this.data.id; 
   console.log('Dialog data:', this.data.id);

    const { title, message } = this.notification;
    const roles = this.selectedRoles;

    this.notificationService.sendNotification(this.data.id, title, message, roles)
      .subscribe(() => {
        console.log('Notification sent successfully.');
        // Handle success if needed
        this.dialogRef.close();
      }, error => {
        console.error('Error sending notification:', error);
        // Handle error if needed
      });
  }

}

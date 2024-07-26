import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notification } from 'src/app/_models/Notification';

@Component({
  selector: 'app-detail-notif-diag',
  templateUrl: './detail-notif-diag.component.html',
  styleUrls: ['./detail-notif-diag.component.css']
})
export class DetailNotifDiagComponent {
  notification: Notification;

  constructor(@Inject(MAT_DIALOG_DATA) public data:Notification ) {
    this.notification = data;
    console.log('Notification:', this.notification);
  }
  
}

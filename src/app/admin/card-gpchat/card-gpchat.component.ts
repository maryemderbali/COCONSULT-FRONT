import { Component, OnInit ,Input} from '@angular/core';
import { GroupChatservice } from 'src/app/_services/GroupChat.service';
import Swal from 'sweetalert2';
import { GroupChatComponent } from '../group-chat/group-chat.component';
import { GroupChat } from 'src/app/_models/GroupChat';
@Component({
  selector: 'app-card-gpchat',
  templateUrl: './card-gpchat.component.html',
  styleUrls: ['./card-gpchat.component.css']
})
export class CardGPCHATComponent implements OnInit{
  @Input() cardContent: string = '';
  @Input() cardTitle: string = '';
  @Input() cardrole: string = '';
  @Input() idGPCHAT: number ;
  @Input() GroupChat:GroupChat ;
  constructor(private GroupChatservice:GroupChatservice,private GroupChatComponent:GroupChatComponent ) { }
  ngOnInit(): void {
    
  }
  determineCardClass(): string {
    if (this.cardrole === 'HR') {
      return '1';
    } else if (this.cardrole === 'PM') {
      return '2';
    } else if (this.cardrole === 'Employee') {
      return '3';
    } else if (this.cardrole === 'Manager') {
      return '1';
    }
    else if (this.cardrole === 'Consult') {
      return '2';
    }
  }
  delete(idGPCHAT){
    this.GroupChatComponent.delete(idGPCHAT);
  }
  openUpdateDialog(GroupChat){

    this.GroupChatComponent.openUpdateDialog(GroupChat);
    console.log(GroupChat);
  }
}

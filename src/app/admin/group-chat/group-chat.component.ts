import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { User } from 'src/app/_models';
import { GroupChat } from 'src/app/_models/GroupChat';
import { RoleName } from 'src/app/_models/Role';
//import { ChatRoomService } from 'src/app/_services/ChatRoom.service';
import { GroupChatservice } from 'src/app/_services/GroupChat.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent {
  GPCHAT: GroupChat[] = [];
  HRGPCHAT: GroupChat[] = [];
  PMGPCHAT: GroupChat[] = [];
  CRMGPCHAT: GroupChat[] = [];
  EmployeeGPCHAT: GroupChat[] = [];
  ManagerGPCHAT: GroupChat[] = [];
  ConsultGPCHAT: GroupChat[] = [];
  roleOptions: string[] = Object.values(RoleName);
  usersOptions: User[] = [];
 // selectedUsers: any[] = [];
 usersByRole: User[] = [];

  constructor(private groupChatService: GroupChatservice,private dialog: MatDialog) {}

  
  loadAvailableUsers(): void {

    this.groupChatService.getAvailableUsers().subscribe((data: User[]) => {
      this.usersOptions= data;
      this.groupChatForm.get('role')?.valueChanges.subscribe(selectedRole => {
        this.usersByRole = [];
        this.usersOptions.forEach(user => {
          user.roles.forEach(role => {
            if (role.name === selectedRole) {
              this.usersByRole.push(user);
            }
          }
          );
        });     
          
      });
    //  console.log(data);
    } , error => { 
      console.error('An error occurred while loading available users:', error);
    });
  }

  ngOnInit(): void {
    this.refreshData();
   
  }
  loadGPCHAT(): void {
    this.groupChatService.getAllGroupChats().subscribe((data: GroupChat[]) => {
      this.GPCHAT = data;

      this.HRGPCHAT = this.GPCHAT.filter(chat => chat.role.name === 'HR');
    //  console.log(this.HRGPCHAT);
      this.PMGPCHAT = this.GPCHAT.filter(chat => chat.role.name === 'PM');
   // console.log(this.PMGPCHAT);
      this.CRMGPCHAT = this.GPCHAT.filter(chat => chat.role.name === 'CRM');
      this.ManagerGPCHAT = this.GPCHAT.filter(chat => chat.role.name === 'Manager');
      this.ConsultGPCHAT = this.GPCHAT.filter(chat =>chat.role.name === 'Consult');
      this.EmployeeGPCHAT = this.GPCHAT.filter(chat => chat.role.name === 'Employee');
      this.CRMGPCHAT= this.GPCHAT.filter(chat => chat.role.name === 'CRM');
    });
  }

  refreshData(): void {
    this.loadGPCHAT();
    this.loadAvailableUsers();

  }

  groupChatForm = new FormGroup({
    groupTitle: new FormControl(''),
    rules: new FormControl(''),
    role: new FormControl(RoleName.HR),
    selectedUsers: new FormControl([])
  });

  /*addUserToFormArray(user: User): void {
    (this.groupChatForm.get('users') as FormArray).push(new FormControl(user.id));
  }*/

  saveGroupChat(): void {
    if (this.groupChatForm.valid) {
      const selectedUserIds  = this.groupChatForm.value.selectedUsers;
      console.log(selectedUserIds);

    // Map selected user IDs to user objects
    const selectedUsers = selectedUserIds.map(id => this.usersOptions.find(user => user.id === id));
   // console.log(selectedUsers);

      const newGroupChat: GroupChat = {
        groupTitle: this.groupChatForm.get('groupTitle')?.value,
        rules: this.groupChatForm.get('rules')?.value,
        role: {
          name: this.groupChatForm.get('role')?.value
        },
        users: selectedUsers 
      };
        console.log(newGroupChat);
      this.groupChatService.createGroupChat(newGroupChat).subscribe({
        next: () => {
          console.log('Group chat saved successfully');
          this.refreshData();
          this.groupChatForm.reset();
        },
        error: (error) => {
          console.error('An error occurred while saving group chat:', error);
        }
      });
    }
  }
  delete(idGPCHAT){
    this.groupChatService.deleteGroupChat(idGPCHAT).subscribe(
      (data) => {
        console.log(data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Groupchat has been deleted successfully",
          showConfirmButton: false,
          timer: 1500
        });
        this.refreshData();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  

  openUpdateDialog(groupChat: GroupChat): void {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '400px', // Adjust the width as needed
      data: { groupChat: groupChat } // Pass the GroupChat data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => { 
        this.refreshData();
    //    console.log("resultat"+result)
       
    });
  }}

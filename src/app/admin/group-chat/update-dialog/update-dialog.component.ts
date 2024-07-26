import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { GroupChat } from 'src/app/_models/GroupChat';
import { User } from 'src/app/_models';
import { RoleName } from 'src/app/_models/Role';
import { GroupChatservice } from 'src/app/_services/GroupChat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent {
  @Input() groupChat: GroupChat;
  @Output() updateGroupChat: EventEmitter<GroupChat> = new EventEmitter<GroupChat>();
  roleOptions: string[] = Object.values(RoleName);
  usersOptions: User[] = [];
  updateForm: FormGroup;
  addusersform: FormGroup;
   usersByRole: User[] = [];

  constructor(
    private dialogRef: MatDialogRef<UpdateDialogComponent>,
    private formBuilder: FormBuilder,
    private groupChatService: GroupChatservice,
    @Inject(MAT_DIALOG_DATA) 
    public data: {groupChat: GroupChat}
  ) {
    this.updateForm = this.formBuilder.group({
      groupTitle: [''],
      rules: [''],
      role: [''],
    });
    this.addusersform= this.formBuilder.group({
      selectedUsers: new FormControl([])
    });
  }
  loadAvailableUsers(): void {

    this.groupChatService.getAvailableUsers().subscribe((data: User[]) => {
      this.usersOptions= data;
      this.updateForm.get('role')?.valueChanges.subscribe(selectedRole => {
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
    this.loadAvailableUsers();
    if (this.data && this.data.groupChat) {
      const groupChatData = this.data.groupChat;
      this.updateForm.patchValue({
        groupTitle: groupChatData.groupTitle,
        rules: groupChatData.rules,
        role: groupChatData.role.name,
      });
    }
  }
  sendaddusersform(): void {
    const selectedUserIds  = this.addusersform.value.selectedUsers;
      console.log(selectedUserIds);

    // Map selected user IDs to user objects
    const selectedUsers = selectedUserIds.map(id => this.usersOptions.find(user => user.id === id));
    console.log(selectedUsers);
    this.groupChatService.addUserToGroupChatByRole(this.data.groupChat.id, selectedUserIds).subscribe( 
      () => {
        console.log('Users added successfully');
        Swal.fire('Utilisateurs ajoutés avec succès');
      },
      error => {
        console.error('An error occurred while adding users:', error);
        Swal.fire('Utilisateurs n a aps le droit pour  rejoidre ce GP !');

        // Handle error
      }
    );
  }
  onSubmit(): void {
    // Get the updated values from the form
    const updatedGroupChat: GroupChat = {
      id: this.data.groupChat.id,
      groupTitle: this.updateForm.value.groupTitle,
      rules: this.updateForm.value.rules,
      role: { name: this.updateForm.value.role },
    };
    
   
    this.groupChatService.updateGroupChat(updatedGroupChat.id,updatedGroupChat.groupTitle,updatedGroupChat.rules).subscribe(
      () => {
        console.log('Group chat updated successfully');
        Swal.fire('Groupe de discussion mis à jour avec succès');
            },
      error => {
        console.error('An error occurred while updating group chat:', error);
        Swal.fire('Vous n avez pas le droit de modifier le role de ce GP !');

        // Handle error
      }
    );
     // Emit the updated GroupChat to the parent component
     this.updateGroupChat.emit(updatedGroupChat);
    // Close the dialog
    this.dialogRef.close();
  }

  onCancel(): void {
    // Close the dialog without updating
    this.dialogRef.close();
  }
  
}

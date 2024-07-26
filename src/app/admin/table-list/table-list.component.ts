import { Component, OnInit } from '@angular/core';


import { UserlistService } from './userlist.service';
import { User } from 'src/app/_models';
import { GroupChatservice } from 'src/app/_services/GroupChat.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  users: User[];
  emlpoyes: User[];
  admins: User[];

  constructor(private UserlistService: UserlistService, private GroupChatservice: GroupChatservice) { }

  ngOnInit(): void {
    //this.getUser();
    // this.getEmlpoyes();
    // this.getEntreprise();
    this.getAllUsers();
  }
  public getAllUsers() {
    this.UserlistService.getUserList().subscribe(data => {
      this.users = data;
    });
  }
  private getUser() {
    this.UserlistService.getUserList().subscribe(data => {
      this.users = data;
    });
  }
  private getEmlpoyes() {
    this.UserlistService.getUserByRoles('ROLE_Employee').subscribe(data => {
      this.emlpoyes = data;
    });
  }

  private getEntreprise() {
    this.UserlistService.getUserByRoles('ROLE_Entreprise').subscribe(data => {
      this.admins = data;
    });
  }


  activateUser(user: User): void {
    this.UserlistService.activateUser(user.id).subscribe(
      () => {

        console.log('Utilisateur activé avec succès.');
        this.getAllUsers();
        // user.valid=true;
        // Faire quelque chose après l'activation réussie
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de l\'activation :', error);
        // Gérer l'erreur d'activation
      }
    );
  }

  bloqueUser(user: User): void {
    this.UserlistService.bloquerUser(user.id).subscribe(
      () => {

        console.log('Utilisateur activé avec succès.');
        this.getAllUsers();
        // user.valid=true;
        // Faire quelque chose après l'activation réussie
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de l\'activation :', error);
        // Gérer l'erreur d'activation
      }
    );
  }
  Ban(user: User): void {
    this.GroupChatservice.bannedUser(user.id).subscribe(
      () => {

        console.log('Utilisateur activé avec succès.');
        this.getAllUsers();
        // user.valid=true;
        // Faire quelque chose après l'activation réussie
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de l\'activation :', error);
        // Gérer l'erreur d'activation
      }
    );
  }
  removeBan(user: User): void {
    this.GroupChatservice.removeBan(user.id).subscribe(
      () => {

        console.log('Utilisateur activé avec succès.');
        this.getAllUsers();
        // user.valid=true;
        // Faire quelque chose après l'activation réussie
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de l\'activation :', error);
        // Gérer l'erreur d'activation
      }
    );
  }
}

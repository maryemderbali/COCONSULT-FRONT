import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeetingService } from 'src/app/_services/meeting.service';
import { UserlistService } from '../table-list/userlist.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-meeting-affectuser',
  templateUrl: './meeting-affectuser.component.html',
  styleUrls: ['./meeting-affectuser.component.css']
})
export class MeetingAffectuserComponent implements OnInit {
  affectationForm: FormGroup;
  meetingId: number; // Ajout de la propriété pour stocker l'ID de la réunion
  meetings: any[]; // Déclarez le type approprié pour vos meetings
  users: any[]; // Déclarez le type approprié pour vos utilisateurs
  filteredUsers: any[]; // Liste des utilisateurs filtrés
  searchControl: FormControl = new FormControl(); // Contrôle du champ de recherche
  userCheckboxes: FormControl[] = []; // Tableau de contrôles de cases à cocher pour chaque utilisateur

  constructor(
    private formBuilder: FormBuilder,
    private meetingService: MeetingService,
    private userService: UserlistService,
    @Inject(MAT_DIALOG_DATA) public data: any // Injection des données passées au dialog
  ) { }

  ngOnInit(): void {
    this.meetingId = this.data.meetingId; // Initialisation de l'ID de la réunion
    this.affectationForm = this.formBuilder.group({
      meeting: [this.meetingId], // Utilisation de l'ID de la réunion passée en paramètre
      users: this.formBuilder.array([]) // Utilisez un FormArray pour les utilisateurs
    });

    this.loadUsers();

    // Filtrer les utilisateurs en fonction de la recherche
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        this.filteredUsers = this.filterUsers(searchTerm);
        this.updateCheckboxes();
      });
  }

  loadUsers() {
    this.userService.getUserList().subscribe(users => {
      this.users = users;
      this.filteredUsers = users;
      this.createCheckboxes();
    });
  }

  private createCheckboxes() {
    this.users.forEach(() => {
      const control = new FormControl(false);
      this.userCheckboxes.push(control);
      (this.affectationForm.controls.users as FormArray).push(control);
    });
  }

  affecterUserAmeet() {
    const selectedUsers = this.affectationForm.value.users
      .map((checked, i) => checked ? this.filteredUsers[i].username : null)
      .filter(value => value !== null);
  
    selectedUsers.forEach(username => {
      this.meetingService.affecterUserAmeet(this.meetingId, username).subscribe(() => {
        console.log(`Utilisateur ${username} affecté avec succès au meeting.`);
      }, error => {
        console.error(`Erreur lors de l\'affectation de l'utilisateur ${username} au meeting :`, error);
      });
    });
  }

  private filterUsers(searchTerm: string): any[] {
    return this.users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  private updateCheckboxes() {
    this.userCheckboxes.forEach((checkbox, index) => {
      const isVisible = this.filteredUsers.some(user => user.username === this.users[index].username);
      isVisible ? checkbox.enable() : checkbox.disable();
    });
  }
}

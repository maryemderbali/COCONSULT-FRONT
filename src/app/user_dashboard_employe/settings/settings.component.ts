import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models';


import { ListeUserAscService } from 'src/app/user_dashboard_employe/settings/liste-user-asc.service';
@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    user:any[];

    constructor(private listeUserAscService: ListeUserAscService) {}
    emlpoyesAsc:User[];
    entrepriseAsc:User[];
    role: string;
    ngOnInit(): void {
        //this.getUserAsc();
        this.getUsersByRole();

    }

    private getUsersByRole() {
        if (this.role === 'ROLE_Entreprise') {
            this.getEntrepriseAsc();
        } else if (this.role === 'ROLE_Employee') {
            this.getEmlpoyesAsc();
        }
    }
    private getEntrepriseAsc(){
        this.listeUserAscService.getUserByRoles('ROLE_Entreprise').subscribe(data => {
            this.emlpoyesAsc = data;
        });
    }
    private getEmlpoyesAsc(){
        this.listeUserAscService.getUserByRoles('ROLE_Employee').subscribe(data => {
            this.entrepriseAsc = data;
        });
    }

    private getUserAsc() {
        this.listeUserAscService.getListUserAsc().subscribe(
            (response: any[]) => {
                console.log('Received data from the API:', response);
                this.user = response;
            },
            (error) => {
                console.error('Error fetching data from the API:', error);
            }
        );
    }




    // private getAdmins(){
    //   this.UserlistService.getUserByRoles('ROLE_Entreprise').subscribe(data => {
    //   this.admins = data;
    //   });
    //   }

}

import { Component, OnInit,ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
  })

  export class UsersComponent implements OnInit {
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['id','name', 'email','profile']; // Add more columns as needed
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
  
    constructor(private userService: UserService, private router : Router) { }
  
    ngOnInit(): void {
      this.userService.getUsers().subscribe(users => {
        this.dataSource = new MatTableDataSource<any>(users);
        this.dataSource.paginator = this.paginator;
      });
    }
    onUserClick(user: any) {
        this.userService.setCurrentUser(user);
        this.router.navigate(['/user_dashboardRH_w/evaluation-manager']);
    }
    onProfileClick(user: any) {
      this.userService.setCurrentUser(user);
      this.router.navigate(['/user_dashboardRH_w/user/', user.id]);
  }
  
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
      
}
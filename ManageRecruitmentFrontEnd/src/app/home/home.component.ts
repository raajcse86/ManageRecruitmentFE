import { MdbTableService } from 'angular-bootstrap-md';

import { Component, OnInit,HostListener } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { EmployeeDetails } from '../_models';
import { UserService } from '../_services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
   
    headElements = ['ID', 'NAME', 'EMAIL', 'STATUS'];
    currentUser: User;
    users: User[] = [];
    employees: EmployeeDetails[] = [];
    searchText: string = '';
    previous: string;

    constructor(private userService: UserService,private tableService:MdbTableService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    @HostListener('input') oninput() {
        this.searchItems();
      }

    ngOnInit() {
        //this.loadAllUsers();
        this.loadAllEmployeeDetails();
              
    }

    searchItems() {
        const prev = this.tableService.getDataSource();
    
        if (!this.searchText) {
          this.tableService.setDataSource(this.previous);
          this.employees = this.tableService.getDataSource();
        }
    
        if (this.searchText) {
          this.employees = this.tableService.searchLocalDataBy(this.searchText);
          this.tableService.setDataSource(prev);
        }
    
      }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

    private loadAllEmployeeDetails() {
        this.userService.getEmployees().pipe(first()).subscribe(employeesFromService => { 
        this.employees = employeesFromService; 
        this.tableService.setDataSource(this.employees);
        this.employees = this.tableService.getDataSource();
        this.previous = this.tableService.getDataSource();

        });
    }
}
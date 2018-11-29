import { MdbTablePaginationComponent,MdbTableService } from 'angular-bootstrap-md';

import { Component, Input,OnInit,ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { EmployeeDetails } from '../_models';
import { CandidatureDetails } from '../_models';
import { UserService } from '../_services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit,AfterViewInit {
    @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
    headElements = ['ID', 'NAME', 'EMAIL', 'STATUS'];

    headElementscanididate = ['ID','roleOfResponsibilities', 'positionLocation', 'candidateName',];

    firstItemIndex;
    lastItemIndex;
    currentUser: User;
    users: User[] = [];
    employees: EmployeeDetails[] = [];
    employeesToDisplay : any;
    candidature: CandidatureDetails[] = [];
    searchText: string = '';
    previous: string;

    constructor(private userService: UserService,private tableService:MdbTableService, private cdRef: ChangeDetectorRef) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngAfterViewInit() {
        this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
        this.firstItemIndex = this.mdbTablePagination.firstItemIndex;
        this.lastItemIndex = this.mdbTablePagination.lastItemIndex;
        this.mdbTablePagination.calculateFirstItemIndex();
        this.mdbTablePagination.calculateLastItemIndex();
        this.cdRef.detectChanges();
        
    
      }
    
      onNextPageClick(data: any) {
        this.firstItemIndex = data.first;
        this.lastItemIndex = data.last;
      }
    
      onPreviousPageClick(data: any) {
        this.firstItemIndex = data.first;
        this.lastItemIndex = data.last;
      }
    
    @HostListener('input') oninput() {
            this.searchItems();
      }

      

    ngOnInit() {
        //this.loadAllUsers();
        this.loadAllEmployeeDetails();
        //this.loadAllCandidatureDetails();
              
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

      searchItemsCandid() {
        const prev = this.tableService.getDataSource();
    
        if (!this.searchText) {
          this.tableService.setDataSource(this.previous);
          this.candidature = this.tableService.getDataSource();
        }
    
        if (this.searchText) {
          this.candidature = this.tableService.searchLocalDataBy(this.searchText);
          this.tableService.setDataSource(prev);
          console.log("candidature >> "+this.candidature);
          console.log("table service >> "+this.tableService.getDataSource());
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
        this.employeesToDisplay = this.employees;

        });
    }
    private loadAllCandidatureDetails() {
        this.userService.getCandidatures().pipe(first()).subscribe(candidatureFromService => { 
        this.candidature = candidatureFromService; 
        this.tableService.setDataSource(this.candidature);
        this.candidature = this.tableService.getDataSource();
        this.previous = this.tableService.getDataSource();

        });
    }
}
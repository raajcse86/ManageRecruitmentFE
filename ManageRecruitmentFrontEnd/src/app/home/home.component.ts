import { MdbTablePaginationComponent,MdbTableService } from 'angular-bootstrap-md';

import { Component, Input,OnInit,ViewChild, ChangeDetectorRef } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { EmployeeDetails } from '../_models';
import { CandidatureDetails } from '../_models';
import { UserService } from '../_services';
import {ExcelService} from '../_services/excel.service';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    
    headElements = ['ID', 'NAME', 'EMAIL', 'STATUS'];
    cols: any[];
    headElementscanididate = ['ID','Role', 'CandidateName', 'ContactNo','Email-Id','TotalExp','RelevantExp','NP','CTC','ECTC',
    'CurrentLoc','ExpLoc','PositionLoc','ModeOfHiring','Source','ProfileSharedDate','FinalStatus','Status',
    'Description','ActionPending','Client','ProfileStatus','StatusUpdateDate','ExpJoiningDate'];
    currentUser: User;
    users: User[] = [];
    employees: EmployeeDetails[] = [];
    candidature: CandidatureDetails[] = [];
    selectedCandidate: CandidatureDetails[];

    constructor(private userService: UserService,
        private tableService:MdbTableService, 
        private cdRef: ChangeDetectorRef,
        private excelService:ExcelService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        //this.loadAllEmployeeDetails();
        this.loadAllCandidatureDetails();
        this.cols = [
            { field: 'contactNo', header: 'ID' },
            { field: 'roleOfResponsibilities', header: 'Role' },
            { field: 'candidateName', header: 'Name' },
            { field: 'contactNo', header: 'ContactNo' },
            { field: 'emailId', header: 'Email-ID' },
            // { field: 'totalExperience', header: 'TotalExp' },
            // { field: 'relevantExperience', header: 'RelevantExp' },
            // { field: 'noticePeriod', header: 'NP' },
            // { field: 'status', header: 'CTC' },
            // { field: 'status', header: 'ECTC' },
            // { field: 'currentLocation', header: 'CurrentLoc' },
            // { field: 'preferredLocation', header: 'PrefLoc' },
            // { field: 'positionLocation', header: 'PosLoc' },
            //{ field: 'modeOfHiring', header: 'ModeOfHiring' },
            //{ field: 'vendorName', header: 'Source' },
            //{ field: 'profileSharedDate', header: 'ProfSharedDate' },
            //{ field: 'finalRoundStatus', header: 'FinalStatus' }
            // { field: 'candidatureStatus', header: 'Status' },
            // { field: 'status', header: 'Description' },
            // { field: 'action', header: 'ActionPending' },
            // { field: 'client', header: 'Client' },
            // { field: 'profile', header: 'ProfileStatus' },
            // { field: 'lastUpdateDate', header: 'StatusUpdDate' },
            // { field: 'joiningDate', header: 'ExpJoiningDate' },
        ];
              
    }
    exportAsXLSX():void {
        this.excelService.exportAsExcelFile(this.candidature, 'sample');
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
        
        

        });
    }
    private loadAllCandidatureDetails() {
        this.userService.getCandidatures().pipe(first()).subscribe(candidatureFromService => { 
        this.candidature = candidatureFromService; 
        

        });
    }
}
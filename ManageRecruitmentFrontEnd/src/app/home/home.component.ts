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
    
    cols: any[];
    currentUser: User;
    users: User[] = [];
    employees: EmployeeDetails[] = [];
    candidatures: CandidatureDetails[] = [];
    candidature: CandidatureDetails ;
    selectedCandidature: CandidatureDetails;
    newCandidature: boolean;

    constructor(private userService: UserService,
        private tableService:MdbTableService, 
        private cdRef: ChangeDetectorRef,
        private excelService:ExcelService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.objectKeys = Object.keys;
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

    onRowSelect(event) {
        this.newCandidature = false;
        console.log("> "+event.data);
        this.candidature = this.cloneCandidature(event.data);
        console.log("candidature val 1 >> "+this.candidature.candidateName);
        console.log("candidature val 2 >> "+this.selectedCandidature);
        
    }

    cloneCandidature(c: CandidatureDetails): CandidatureDetails {
        let candidature:CandidatureDetails;
        for (let prop in c) {
            candidature[prop] = c[prop];
        }
        return candidature;
    }

    save() {
        let candidatures = [...this.candidatures];
        if (this.newCandidature)
            candidatures.push(this.candidature);
        else
            candidatures[this.candidatures.indexOf(this.selectedCandidature)] = this.candidature;

        this.candidatures = candidatures;
        this.candidature = null;
        
    }

    delete() {
        let index = this.candidatures.indexOf(this.selectedCandidature);
        this.candidatures = this.candidatures.filter((val, i) => i != index);
        this.candidature = null;
        
    }


    private loadAllEmployeeDetails() {
        this.userService.getEmployees().pipe(first()).subscribe(employeesFromService => { 
        this.employees = employeesFromService; 
        
        

        });
    }
    private loadAllCandidatureDetails() {
        this.userService.getCandidatures().pipe(first()).subscribe(candidatureFromService => { 
        this.candidatures = candidatureFromService; 
          

        });
    }

    exportAsXLSX():void {
        this.excelService.exportAsExcelFile(this.candidatures, 'sample');
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

    
}
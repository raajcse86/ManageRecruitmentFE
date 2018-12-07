import { MdbTablePaginationComponent,MdbTableService } from 'angular-bootstrap-md';
import { Router } from '@angular/router';
import { Component, Input,OnInit,ViewChild, ChangeDetectorRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { EmployeeDetails } from '../_models';
import { CandidatureDetails } from '../_models';
import { UserService } from '../_services';
import {ExcelService} from '../_services/excel.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({templateUrl: 'home.component.html',providers: [MessageService]})
export class HomeComponent implements OnInit {
    
    cols: any[];
    currentUser: User;
    users: User[] = [];
    employees: EmployeeDetails[] = [];
    candidatures: CandidatureDetails[] = [];
    candidature: CandidatureDetails ;
    selectedCandidature: CandidatureDetails;
    fromButtonValue:string;
    newCandidature: boolean;


    constructor(private userService: UserService,
        private tableService:MdbTableService, 
        private cdRef: ChangeDetectorRef,
        private excelService:ExcelService,
        private messageService:MessageService,
        private router: Router) {
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

    save(rowData:any) {
        let updatedCandidature = rowData;
        this.userService.updateCandidature(updatedCandidature)
            .pipe(first())
            .subscribe(
                data => {
                    this.messageService.add({severity:'success', summary: 'Success Message', detail:'Data updated successfully.'});
                    this.router.navigate(['/home']);
                    console.log("Navigation call");
                    this.loadAllCandidatureDetails();
                },
            error => {
                this.messageService.add({severity:'error', summary: 'Error Message', detail:'Something went wrong. Operation failed.'});

            });
    }

    delete(rowData:any) {
        let updatedCandidature = rowData;
        console.log("candidate id delete "+updatedCandidature.id);
        this.userService.deleteCandidature(updatedCandidature.id)
            .pipe(first())
            .subscribe(
                data => {
                    this.messageService.add({severity:'success', summary: 'Success Message', detail:'Data Deleted successfully.'});
                    this.router.navigate(['/home']);
                },
            error => {
                this.messageService.add({severity:'error', summary: 'Error Message', detail:'Something went wrong. Operation failed.'});

            });
            
    }
    showConfirm(frombutton,rowData:any) {
        this.messageService.clear();
        this.fromButtonValue = frombutton;
        this.selectedCandidature = rowData;
        this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
    }

    onConfirm() {
        this.messageService.clear('c');
        if(this.fromButtonValue =='fromsave'){
            this.save(this.selectedCandidature);
        }else if(this.fromButtonValue == 'fromdelete'){
            this.delete(this.selectedCandidature);
        }

    }

    onReject() {
        this.messageService.clear('c');
        this.selectedCandidature = null;
        this.fromButtonValue = null;
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
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import Mappings from './profile.mappings';
import { MessageService } from 'primeng/components/common/messageservice';
import { UserService } from '../_services';
import { first } from 'rxjs/operators';
import { CandidatureDetails } from './../_models/candidatureDetails';
import { CandidatureDetailsService } from './../_services/candidature-details.service';
import {FormGroup,FormBuilder,AbstractControl,Validators} from '@angular/forms';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {
  id: string;
  private sub: any;
  profile: any;
  keys: string[];
  mapping_keys: string[];
  excludable_keys_in_display_mode: any;
  is_editable: boolean = false;
  fromButtonValue:string;
  selectedCandidature: CandidatureDetails;
  CandidatureDetails:FormGroup;
  candidateID:string;
  step;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidatureDetailsService : CandidatureDetailsService,
    private messageService:MessageService,
    private fb:FormBuilder,
  ) { }

  ngOnInit() {
    
    this.excludable_keys_in_display_mode = ['candidateName', 'roleOfResponsibilities', 'totalExperience'];
    let snapshot = this.route.snapshot.paramMap.get('slug');
    this.profile = JSON.parse(atob(snapshot));
    this.candidateID = this.profile.id;
    delete this.profile.id;
    this.keys = Object.keys(this.profile);
   
    this.mapping_keys = Mappings;

    this.step=1;

    this.CandidatureDetails=this.fb.group({
           
        roleOfResponsibilities:[this.profile['roleOfResponsibilities'],[Validators.required]],
        positionLocation:[this.profile['positionLocation']],
        candidateName:[this.profile['candidateName'],[Validators.required]],
        contactNo:[this.profile['contactNo'],[Validators.required,this.validatePhoneNum.bind(this)]],
        emailId:[this.profile['emailId'],[Validators.required,this.validateEmail.bind(this)]],
        totalExperience:[this.profile['totalExperience']],
        relevantExperience:[this.profile['relevantExperience']],
        noticePeriod:[this.profile['noticePeriod']],
        ctc:[this.profile['ctc']],
        ectc:[this.profile['expectedCTC']],
        currentLocation:[this.profile['currentLocation']],
        preferredLocation:[this.profile['preferredLocation']],
        modeOfHiring:[this.profile['modeOfHiring']],
        vendorName:[this.profile['source']],
        profileSharedDate:[this.profile['profileSharedDate']],
        screeningStatus:[this.profile['screeningStatus']],
        screeningDate:[this.profile['screeningDate']],
        screeningDoneBy:[this.profile['screeningDoneBy']],
        firstRoundStatus:[this.profile['firstRoundStatus']],
        firstRoundDate:[this.profile['firstRoundDate']],
        firstRoundTakenBy:[this.profile['firstRoundTakenBy']],
        secondRoundStatus:[this.profile['secondRoundStatus']],
        secondRoundDate:[this.profile['secondRoundDate']],
        secondRoundTakenBy:[this.profile['secondRoundTakenBy']],
        finalRoundStatus:[this.profile['finalRoundStatus']],
        finalRoundDate:[this.profile['finalRoundDate']],
        finalRoundTakenBy:[this.profile['finalRoundTakenBy']],
        hrOrPnStageRound:[this.profile['hrOrPnStageRound']],
        hrOrPnStageStatus:[this.profile['hrOrPnStageStatus']],
        hrOrPnStageDate:[this.profile['hrOrPnStageDate']],
        candidatureStatus:[this.profile['roleOfResponsibilities']],
        finalStatus:[this.profile['finalStatus']],
        status:[this.profile['status']],
        description:[this.profile['description']],
        offerRollOutDate:[this.profile['roleOfResponsibilities']],
        joiningDate:[this.profile['expectedJoiningDate']],
        joiningStatus:[this.profile['roleOfResponsibilities']],
        nhrId:[this.profile['roleOfResponsibilities']],
        comments:[this.profile['roleOfResponsibilities']],
        action:[this.profile['roleOfResponsibilities']],
        actionPending:[this.profile['actionPending']],
        client:[this.profile['client']],
        profile:[this.profile['profileStatus']],
        lastUpdateDate:[this.profile['roleOfResponsibilities']]
        
    })


  }

  toggleEditState() {
    this.is_editable = !this.is_editable;
  }

  save() {
    this.candidatureDetailsService.updateCandidature(this.selectedCandidature)
         .pipe(first())
         
         .subscribe(
             data => {
                    
                      this.messageService.add({severity:'success', summary: 'Success Message', detail:'Data updated successfully.'});

             },
         error => {
             this.messageService.add({severity:'error', summary: 'Error Message', detail:'Something went wrong. Operation failed.'});

         });
         
        // this.router.navigate(['/home']);

}

delete() {
 this.candidatureDetailsService.deleteCandidature(this.selectedCandidature.id)
     .pipe(first())
     .subscribe(
         data => {
             this.messageService.add({severity:'success', summary: 'Success Message', detail:'Data Deleted successfully.'});
             
         },
     error => {
         this.messageService.add({severity:'error', summary: 'Error Message', detail:'Something went wrong. Operation failed.'});

     });

    //   this.router.navigate(['/home']);
     
}
showConfirm(frombutton:any,rowData:any) {
 this.messageService.clear();
 this.fromButtonValue = frombutton;
 this.selectedCandidature = this.CandidatureDetails.value;
 this.selectedCandidature.id=this.candidateID;
this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
 
}

onConfirm() {
 this.messageService.clear('c');
 if(this.fromButtonValue =='fromsave'){
     this.save();
    
 }else if(this.fromButtonValue == 'fromdelete'){
     this.delete();
 }

}

onReject() {
 this.messageService.clear('c');
 this.selectedCandidature = null;
 this.fromButtonValue = null;
}

validatePhoneNum(control: AbstractControl) {
    const pattern = /^([0-9\.]+)$/;
    if(null!=control.value){
            if (!control.value.match(pattern))
                 return { invalidEmail: true };
            else
                 return null;
        }
  }

validateEmail(control: AbstractControl) {
    const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (!control.value.match(pattern)) {
      return { invalidEmail: true };
    }

    return null;
  }



}

import { CandidatureDetailsService } from './../_services/candidature-details.service';
import { Component,OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {FormGroup,FormBuilder,FormControl,AbstractControl,Validators} from '@angular/forms';
import { CandidatureDetails } from '../_models';
import { MessageService } from 'primeng/components/common/messageservice';
import { AlertService } from '../_services';


@Component({
  selector: 'add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css'],
  providers: [MessageService]
})
export class AddCandidateComponent implements OnInit {

  CandidatureDetails:FormGroup;
  model: CandidatureDetails;
  step;

  constructor(
    private fb:FormBuilder,
    private candidatureDetailsService: CandidatureDetailsService,
    private messageService:MessageService,
    private router: Router,
    private alertService: AlertService) {
    // this.objectKeys = Object.keys;
   
}

  ngOnInit() {

    this.step=1;
        this.CandidatureDetails=this.fb.group({
           
            roleOfResponsibilities:['',[Validators.required]],
            positionLocation:[''],
            candidateName:['',[Validators.required]],
            contactNo:['',[Validators.required,this.validatePhoneNum.bind(this)]],
            emailId:['',[Validators.required,this.validateEmail.bind(this)]],
            totalExperience:[''],
            relevantExperience:[''],
            noticePeriod:[''],
            ctc:[''],
            ectc:[''],
            currentLocation:[''],
            preferredLocation:[''],
            modeOfHiring:[''],
            vendorName:[''],
            profileSharedDate:[''],
            screeningStatus:[''],
            screeningDate:[''],
            screeningDoneBy:[''],
            firstRoundStatus:[''],
            firstRoundDate:[''],
            firstRoundTakenBy:[''],
            secondRoundStatus:[''],
            secondRoundDate:[''],
            secondRoundTakenBy:[''],
            finalRoundStatus:[''],
            finalRoundDate:[''],
            finalRoundTakenBy:[''],
            hrOrPnStageRound:[''],
            hrOrPnStageStatus:[''],
            hrOrPnStageDate:[''],
            candidatureStatus:[''],
            finalStatus:[''],
            status:[''],
            description:[''],
            offerRollOutDate:[''],
            joiningDate:[''],
            joiningStatus:[''],
            nhrId:[''],
            comments:[''],
            action:[''],
            actionPending:[''],
            client:[''],
            profile:[''],
            lastUpdateDate:['']
            
        })


  }
 
  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }

  validatePhoneNum(control: AbstractControl) {
    const pattern = /^([0-9\.]+)$/;

    if (!control.value.match(pattern)) {
      return { invalidEmail: true };
    }

    return null;
  }

validateEmail(control: AbstractControl) {
    const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (!control.value.match(pattern)) {
      return { invalidEmail: true };
    }

    return null;
  }

  addCandidate(){

    this.candidatureDetailsService.saveCandidature(this.CandidatureDetails.value).subscribe(
             data => {
                    
                      this.messageService.add({severity:'success', summary: 'Success Message', detail:'Data updated successfully.'});

             },
         error => {
             this.messageService.add({severity:'error', summary: 'Error Message', detail:'Something went wrong. Operation failed.'});

         });
    this.alertService.success('Candidate Added successfully', true);
    this.router.navigate(['/home']);
  }

}
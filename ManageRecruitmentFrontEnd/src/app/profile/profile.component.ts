import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import Mappings from './profile.mappings';
import { MessageService } from 'primeng/components/common/messageservice';
import { UserService } from '../_services';
import { first } from 'rxjs/operators';
import { CandidatureDetails } from './../_models/candidatureDetails';


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


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private messageService:MessageService
  ) { }

  ngOnInit() {
    
    this.excludable_keys_in_display_mode = ['candidateName', 'roleOfResponsibilities', 'totalExperience'];
    let snapshot = this.route.snapshot.paramMap.get('slug');
    this.profile = JSON.parse(atob(snapshot));
    this.keys = Object.keys(this.profile);
    this.mapping_keys = Mappings;

  }

  toggleEditState() {
    this.is_editable = !this.is_editable;
  }

  save() {
    this.userService.updateCandidature(this.selectedCandidature)
         .pipe(first())
         .subscribe(
             data => {
                 this.messageService.add({severity:'success', summary: 'Success Message', detail:'Data updated successfully.'});
                 this.router.navigate(['/home']);
                 console.log("Navigation call");
                 
             },
         error => {
             this.messageService.add({severity:'error', summary: 'Error Message', detail:'Something went wrong. Operation failed.'});

         });

}

delete() {
 this.userService.deleteCandidature(this.selectedCandidature.id)
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
showConfirm(frombutton:any,rowData:any) {
 console.log("called showConfirm...");
 this.messageService.clear();
 this.fromButtonValue = frombutton;
 this.selectedCandidature = rowData;
 console.log("before popup");
 this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
 console.log("after popup");
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

}

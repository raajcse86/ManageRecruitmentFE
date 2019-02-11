import { Component, OnInit } from '@angular/core';
import {NotificationService} from './notification.service'
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

 approvalColumns: String[]=[];
 approvalList: any;
 index:number;
 space: String;
  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadAllApprovals();
    this.index=1;
    this.space="   ";
  }

  private loadAllApprovals(){
    this.notificationService.loadAllApprovals().subscribe(response=>{
      console.log("Response is :: "+JSON.stringify(response));
      this.approvalList=response;
    })
  }

  private updateApprovalStatus(user:any){
    this.notificationService.updateApprovalStatus(user).subscribe(response=>{
      console.log("Response is :: "+JSON.stringify(response));
    })
  }

  private triggerApprovalEvent(event:String, user: any){
    console.log("In triggerApprovalEvent ");
    console.log(event);
    if(event=="Approve")
      user.status="Approved";
    else
     user.status="Rejected";
    console.log(JSON.stringify(user));
    this.updateApprovalStatus(user);
  }
}

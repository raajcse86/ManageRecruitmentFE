import { SummaryDataClient } from './../_models/summaryDataClient';
import { ChartData } from './../_models/chartData';
import { Component, OnInit } from '@angular/core';

import { CandidatureDetails } from './../_models/candidatureDetails';
import { CandidatureDetailsService } from './../_services/candidature-details.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {

  constructor(private candidatureDetailsService : CandidatureDetailsService,
    private messageService:MessageService){

      
  }
  
  summaryDataClientArray: SummaryDataClient[] = [];
  summaryDataTestArray:SummaryDataClient[] = [];
  summaryDataTestArray2:SummaryDataClient[] = [];
  candidatureDetailsArray:CandidatureDetails[]=[];
  showSubTable:boolean;
  showSummaryTable:boolean;
  showChart:boolean;
  public checkboxselect:string;
  public pie_chartLabels: Array<any> = ['Joined', 'OffReleased', 'OffInprogress', 'IntrInProgress', 'ScreeningInProgress'];
  public pie_chartDatasets: Array<any> = [
    { data: [300, 50, 100, 40, 120], label: 'Bangalore' },
    { data: [100, 200, 30, 400, 50], label: 'Chennai' },
    { data: [200, 150, 70, 80, 180], label: 'Mumbai' },
    //{ data: [100, 200, 300, 40, 50], label: 'Delhi' }
  ];
  public pie_chartType: string = 'line';
  public data: Array<any> = [];
  chartData:Array<ChartData> = []
  chartObj:ChartData = {data:[],labels:''};
  public pie_chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 250, 220, .4)',
      borderColor: 'rgba(0, 213, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(120, 220, 160, .6)',
      borderColor: 'rgba(0, 213, 132, .7)',
      borderWidth: 2,
    }
  ];

  public pie_chartOptions: any = {
    responsive: true
  };
  public pie_chartClicked(e: any): void {
    console.log(e);
   }
  public pie_chartHovered(e: any): void { 
    console.log("on hover "+e);

  }

  ngOnInit(){
    this.showSummaryTable=false;
    this.showSubTable=false;
    
    
  }

  changeChart(buttonClicked:string){
    if(buttonClicked ==='line'){
      this.pie_chartType="line";
    }else if(buttonClicked === 'bar'){
      this.pie_chartType="bar";
    }else if(buttonClicked === 'radar'){
      this.pie_chartType="radar";
    }
    this.displayChart(this.checkboxselect);
  }
  onRadioSelect(e,valuePassed) {
    if(e.target.checked){
        this.getSummaryDataClient();
        this.showChart = true;
        this.showSummaryTable=true;
        this.checkboxselect=valuePassed;
        this.displayChart(this.checkboxselect);
        this.getCandidateDetailStatusCountByClient("Dell");
        
    }
 }

 displayChart(radioSelectVal:any){
  //mockup data.
   this.candidatureDetailsArray = [{"id":"5bff9282816fdf03003b9a81","roleOfResponsibilities":"Lead Full stack Developer (.Net)","positionLocation":"NCR","candidateName":"Bhanu Pratap Verma","contactNo":"9911695811","emailId":"vermabhanu009@gmail.com","totalExperience":"8.4 Yrs.","relevantExperience":"5","noticePeriod":"3 Months","currentLocation":"Noida","preferredLocation":"Bangalore","modeOfHiring":"Permanent","vendorName":"Recruitement-Deepti","profileSharedDate":null,"screeningStatus":"","screeningDate":null,"screeningDoneBy":"","firstRoundStatus":"","firstRoundDate":null,"firstRoundTakenBy":"","secondRoundStatus":"","secondRoundDate":null,"secondRoundTakenBy":"","finalRoundStatus":"","finalRoundDate":null,"finalRoundTakenBy":"","hrOrPnStageRound":"","hrOrPnStageStatus":"","hrOrPnStageDate":null,"candidatureStatus":"Rejected/Not Shortlisted","offerRollOutDate":null,"joiningDate":null,"joiningStatus":"","nhrId":"","comments":"","action":"Nitin Bhave","client":"Multiple Clients","profile":"Inactive","lastUpdateDate":"11/13/18"},{"id":"5bff9282816fdf03003b9a82","roleOfResponsibilities":"Java Developer","positionLocation":"Bangalore","candidateName":"Laldhari","contactNo":"9512121211","emailId":"laldhari@gmail.com","totalExperience":"5yrs","relevantExperience":"2","noticePeriod":"3 Months","currentLocation":"Bangalore","preferredLocation":"Chennai","modeOfHiring":"Permanent","vendorName":"Recruitement-Deepti","profileSharedDate":null,"screeningStatus":"","screeningDate":null,"screeningDoneBy":"","firstRoundStatus":"","firstRoundDate":null,"firstRoundTakenBy":"","secondRoundStatus":"","secondRoundDate":null,"secondRoundTakenBy":"","finalRoundStatus":"","finalRoundDate":null,"finalRoundTakenBy":"","hrOrPnStageRound":"","hrOrPnStageStatus":"","hrOrPnStageDate":null,"candidatureStatus":"Recruited","offerRollOutDate":null,"joiningDate":null,"joiningStatus":"","nhrId":"","comments":"","action":"Nitin Bhave","client":"Multiple Clients","profile":"Inactive","lastUpdateDate":"11/10/18"},{"id":"5bffdb686e4c0e37cba4fd73","roleOfResponsibilities":"Java Developer","positionLocation":"Bangalore","candidateName":"Rajasekar","contactNo":"9512121212","emailId":"raj@gmail.com","totalExperience":"5yrs","relevantExperience":"2","noticePeriod":"3 Months","currentLocation":"Bangalore","preferredLocation":"Chennai","modeOfHiring":"Permanent","vendorName":"Recruitement-Deepti","profileSharedDate":null,"screeningStatus":"","screeningDate":null,"screeningDoneBy":"","firstRoundStatus":"","firstRoundDate":null,"firstRoundTakenBy":"","secondRoundStatus":"","secondRoundDate":null,"secondRoundTakenBy":"","finalRoundStatus":"","finalRoundDate":null,"finalRoundTakenBy":"","hrOrPnStageRound":"","hrOrPnStageStatus":"","hrOrPnStageDate":null,"candidatureStatus":"Recruited","offerRollOutDate":null,"joiningDate":null,"joiningStatus":"","nhrId":"","comments":"","action":"Nitin Bhave","client":"Multiple Clients","profile":"Inactive","lastUpdateDate":"11/10/18"},{"id":"5bffdbb36e4c0e37cba4fd8a","roleOfResponsibilities":"Java Developer","positionLocation":"Bangalore","candidateName":"Virat","contactNo":"9512121215","emailId":"virat@gmail.com","totalExperience":"5yrs","relevantExperience":"2","noticePeriod":"3 Months","currentLocation":"Bangalore","preferredLocation":"Chennai","modeOfHiring":"Permanent","vendorName":"Recruitement-Deepti","profileSharedDate":null,"screeningStatus":"","screeningDate":null,"screeningDoneBy":"","firstRoundStatus":"","firstRoundDate":null,"firstRoundTakenBy":"","secondRoundStatus":"","secondRoundDate":null,"secondRoundTakenBy":"","finalRoundStatus":"","finalRoundDate":null,"finalRoundTakenBy":"","hrOrPnStageRound":"","hrOrPnStageStatus":"","hrOrPnStageDate":null,"candidatureStatus":"Recruited","offerRollOutDate":null,"joiningDate":null,"joiningStatus":"","nhrId":"","comments":"","action":"Nitin Bhave","client":"Multiple Clients","profile":"Inactive","lastUpdateDate":"11/10/18"}];
   
 }


 displaySubTable(rowPassed:any,colSelected:any){
  this.showSubTable= true ;
  //mockup data.
   this.candidatureDetailsArray = [{"id":"5bff9282816fdf03003b9a81","roleOfResponsibilities":"Lead Full stack Developer (.Net)","positionLocation":"NCR","candidateName":"Bhanu Pratap Verma","contactNo":"9911695811","emailId":"vermabhanu009@gmail.com","totalExperience":"8.4 Yrs.","relevantExperience":"5","noticePeriod":"3 Months","currentLocation":"Noida","preferredLocation":"Bangalore","modeOfHiring":"Permanent","vendorName":"Recruitement-Deepti","profileSharedDate":null,"screeningStatus":"","screeningDate":null,"screeningDoneBy":"","firstRoundStatus":"","firstRoundDate":null,"firstRoundTakenBy":"","secondRoundStatus":"","secondRoundDate":null,"secondRoundTakenBy":"","finalRoundStatus":"","finalRoundDate":null,"finalRoundTakenBy":"","hrOrPnStageRound":"","hrOrPnStageStatus":"","hrOrPnStageDate":null,"candidatureStatus":"Rejected/Not Shortlisted","offerRollOutDate":null,"joiningDate":null,"joiningStatus":"","nhrId":"","comments":"","action":"Nitin Bhave","client":"Multiple Clients","profile":"Inactive","lastUpdateDate":"11/13/18"},{"id":"5bff9282816fdf03003b9a82","roleOfResponsibilities":"Java Developer","positionLocation":"Bangalore","candidateName":"Laldhari","contactNo":"9512121211","emailId":"laldhari@gmail.com","totalExperience":"5yrs","relevantExperience":"2","noticePeriod":"3 Months","currentLocation":"Bangalore","preferredLocation":"Chennai","modeOfHiring":"Permanent","vendorName":"Recruitement-Deepti","profileSharedDate":null,"screeningStatus":"","screeningDate":null,"screeningDoneBy":"","firstRoundStatus":"","firstRoundDate":null,"firstRoundTakenBy":"","secondRoundStatus":"","secondRoundDate":null,"secondRoundTakenBy":"","finalRoundStatus":"","finalRoundDate":null,"finalRoundTakenBy":"","hrOrPnStageRound":"","hrOrPnStageStatus":"","hrOrPnStageDate":null,"candidatureStatus":"Recruited","offerRollOutDate":null,"joiningDate":null,"joiningStatus":"","nhrId":"","comments":"","action":"Nitin Bhave","client":"Multiple Clients","profile":"Inactive","lastUpdateDate":"11/10/18"},{"id":"5bffdb686e4c0e37cba4fd73","roleOfResponsibilities":"Java Developer","positionLocation":"Bangalore","candidateName":"Rajasekar","contactNo":"9512121212","emailId":"raj@gmail.com","totalExperience":"5yrs","relevantExperience":"2","noticePeriod":"3 Months","currentLocation":"Bangalore","preferredLocation":"Chennai","modeOfHiring":"Permanent","vendorName":"Recruitement-Deepti","profileSharedDate":null,"screeningStatus":"","screeningDate":null,"screeningDoneBy":"","firstRoundStatus":"","firstRoundDate":null,"firstRoundTakenBy":"","secondRoundStatus":"","secondRoundDate":null,"secondRoundTakenBy":"","finalRoundStatus":"","finalRoundDate":null,"finalRoundTakenBy":"","hrOrPnStageRound":"","hrOrPnStageStatus":"","hrOrPnStageDate":null,"candidatureStatus":"Recruited","offerRollOutDate":null,"joiningDate":null,"joiningStatus":"","nhrId":"","comments":"","action":"Nitin Bhave","client":"Multiple Clients","profile":"Inactive","lastUpdateDate":"11/10/18"},{"id":"5bffdbb36e4c0e37cba4fd8a","roleOfResponsibilities":"Java Developer","positionLocation":"Bangalore","candidateName":"Virat","contactNo":"9512121215","emailId":"virat@gmail.com","totalExperience":"5yrs","relevantExperience":"2","noticePeriod":"3 Months","currentLocation":"Bangalore","preferredLocation":"Chennai","modeOfHiring":"Permanent","vendorName":"Recruitement-Deepti","profileSharedDate":null,"screeningStatus":"","screeningDate":null,"screeningDoneBy":"","firstRoundStatus":"","firstRoundDate":null,"firstRoundTakenBy":"","secondRoundStatus":"","secondRoundDate":null,"secondRoundTakenBy":"","finalRoundStatus":"","finalRoundDate":null,"finalRoundTakenBy":"","hrOrPnStageRound":"","hrOrPnStageStatus":"","hrOrPnStageDate":null,"candidatureStatus":"Recruited","offerRollOutDate":null,"joiningDate":null,"joiningStatus":"","nhrId":"","comments":"","action":"Nitin Bhave","client":"Multiple Clients","profile":"Inactive","lastUpdateDate":"11/10/18"}];
   


 }

  getCandidateDetailStatusCountByClient(clientName:string){
    this.candidatureDetailsService.getCandidatureStatusCountByClientName(clientName)
    .pipe(first())
    .subscribe(
      (data:any) =>{
          Object.keys(data).forEach(key => {
          this.pie_chartLabels.push(key);
          this.data.push(data[key]);
        })
        this.chartObj.data = this.data;
        this.chartObj.labels = "First Data set";
        this.chartData.push(this.chartObj);
        this.pie_chartDatasets = this.chartData;
        

      },
      error =>{

      }

    );

  }
  

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

  getSummaryDataClient(){
      this.summaryDataClientArray = [
      {
        "clientName":"Dell",
        "leadName":"",
        "location" : "Bangalore",
        "skill" : "java",
        "contractMechanism":"",
        "target":"",
        "joinedCount":4,
        "offerReleasedCount":6,
        "offerInProgressCount":11,
        "interviewInProgressCount":4,
        "screeningInProgressCount":2
      },
      {
        "clientName":"Dell",
        "leadName":"",
        "location" : "Chennai",
        "skill" : "java",
        "contractMechanism":"",
        "target":"",
        "joinedCount":4,
        "offerReleasedCount":6,
        "offerInProgressCount":11,
        "interviewInProgressCount":4,
        "screeningInProgressCount":2
      },
      {
        "clientName":"EMC2",
        "leadName":"",
        "location" : "Pune",
        "skill" : "java",
        "contractMechanism":"",
        "target":"",
        "joinedCount":8,
        "offerReleasedCount":3,
        "offerInProgressCount":11,
        "interviewInProgressCount":4,
        "screeningInProgressCount":2
      },
      {
        "clientName":"EMC2",
        "leadName":"",
        "location" : "Chennai",
        "skill" : "java",
        "contractMechanism":"",
        "target":"",
        "joinedCount":8,
        "offerReleasedCount":3,
        "offerInProgressCount":11,
        "interviewInProgressCount":4,
        "screeningInProgressCount":2
      },
      {
        "clientName":"Unilever",
        "leadName":"",
        "location" : "Chennai",
        "skill" : "java",
        "contractMechanism":"",
        "target":"",
        "joinedCount":12,
        "offerReleasedCount":10,
        "offerInProgressCount":11,
        "interviewInProgressCount":4,
        "screeningInProgressCount":2
      }
    
    ];

    //Call to service
    // this.candidatureDetailsService.getSummaryDataClient().pipe(first()).subscribe(summaryDataClient => { 
    // this.summaryDataClientArray = summaryDataClient; 

    //   });


    //call for testing filter.
    
    // this.summaryDataTestArray2 = this.summaryDataTestArray.filter((summaryData:SummaryDataClient)=> 
    // summaryData.clientName.toLowerCase() === 'dell' &&
    // summaryData.location.toLowerCase() === 'chennai');

    //Group by fields on a map.
    //this.summaryDataTestArray = this.summaryDataClientArray;
    //const grouped = this.groupBy(this.summaryDataTestArray, summar => summar.clientName);

    //console.log("Group by "+grouped.get('Dell'));

    //Iterating over map.
  //   grouped.forEach((value: SummaryDataClient[], key: string) => {
  //     console.log("keys >> "+key);
  //     console.log("list size >> "+value.length);
  //     this.summaryDataTestArray2 = [];
  //     value.forEach(summary => {
  //       console.log("values >> "+summary.location);
  //       if(summary.location.toLowerCase() === 'chennai'){
  //         this.summaryDataTestArray2.push(summary);
  //       }
  //    });
  //    console.log("size "+this.summaryDataTestArray2.length);

  // });
    
  }


  
  

}

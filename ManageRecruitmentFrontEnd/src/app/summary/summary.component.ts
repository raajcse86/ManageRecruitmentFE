
import { Component, OnInit } from '@angular/core';
import { CandidatureDetailsService } from './../_services/candidature-details.service';
import { CandidatureDetails } from '../_models';
import { first } from 'rxjs/operators';
import { chart } from '../_models/chart';
import { Summary } from '../_models/summary';
import {CandidateSummary} from '../_models/candidateSummary'
import { SelectItem } from 'primeng/components/common/selectitem';


@Component({
selector: 'app-summary',
templateUrl: './summary.component.html',
styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
summarylist:Summary[];
public pie_chartType: string = 'bar';
chartRawData: chart;

public pie_chartLabels: Array<String> = [];
public pie_chartDatasets: Array<any> = [];
//Candidate summary
candidatures: CandidatureDetails[] = [];
candidateSummary: CandidateSummary[]=[];
cols: any[];
clients:SelectItem[];
locations:SelectItem[];
status:SelectItem[];


constructor( private candidatureDetailsService: CandidatureDetailsService) { 
}

ngOnInit() {
/*this.candidatureDetailsService.getCandidaturesChart('client').pipe(first()).subscribe(candidatureFromService => { 
this.chartRawData = candidatureFromService; 
console.log('chartRawData ::' +this.chartRawData.chartDatasets[1].data);
this.pie_chartLabels=this.chartRawData.chartLabels;
this.pie_chartDatasets=this.chartRawData.chartDatasets;
if(this.pie_chartLabels.length>0){
this.showTable=true;
}
});*/

this.candidatureDetailsService.getClientSummary().subscribe(
    data => {
        console.log(data);
        this.summarylist=data;
        
     },
    error  => {
    console.log("Error", error);
    });
    //Candidature summary changes :: 
    this.loadAllCandidatureDetails();
    this.cols = [
        { field: 'candidateName', header: 'Candidate Name' },
        { field: 'clientName', header: 'Client Name' },
        { field: 'skills', header: 'Skills' },
        { field: 'status', header: 'Status' },
        { field: 'emailId', header: 'Email id' },
        { field: 'location', header: 'Location' },
        { field: 'expectedToJoin', header: 'Expected to Join' },
        { field: 'finalTechSelection', header: 'Fnal Tech Selection' }    
      ];
    this.clients=[
        { label:'Dell', value:'Dell'},
        { label:'Unilever', value:'Unilever'},
        { label:'EMC', value:'EMC'},
      ];

    this.locations=[
        { label:'All', value:null},
        { label:'Bangalore', value:'Bangalore'},
        { label:'Pune', value:'Pune'},
        { label:'Nioda', value:'Noida'},
        { label:'Gurgaon', value:'Gurgaon'},     
     ];
  this.status=[
        { label:'All', value:null},
        //{ label:'Yet to screen', value:'Yet to screen'},
        { label:'Offer In Progress', value:'Offer In Progress'},
        { label:'Offer Released', value:'Offer Released'},
        { label:'Joined', value:'Joined'}
       // ,{ label:'Dropout', value:'Dropout'},
      ];

}


//Method to get entire candidate details from API
private loadAllCandidatureDetails() {
    this.candidatureDetailsService.getCandidatures().pipe(first()).subscribe(candidatureFromService => { 
        this.candidatures = candidatureFromService; 
        this.candidatures.forEach(candidate=>{
          if(candidate.status!='1st round scheduled'){
         let currentCandidate:CandidateSummary={
           candidateName : candidate.candidateName,
           clientName    : candidate.client,
           skills        :candidate.roleOfResponsibilities,
           status        : candidate.status,
           emailId       : candidate.emailId,
           expectedToJoin:candidate.expectedJoiningDate,
           location      : candidate.positionLocation,
           finalTechSelection:candidate.finalTechSelectionDate
         };
        this.candidateSummary.push(currentCandidate);
         console.log("current candidate :: "+ JSON.stringify(currentCandidate));
        }
         })
       });
 }

 
 public getColourCode(field: any): string { 
   // console.log(" colour code for "+field)
    let colourCode: string = "default";
    // if(field==='Yet to screen')
    // colourCode="yts";
    // else if (field==='1st round to be scheduled')
    // colourCode= "tbs";

     if (field==='Joined')
    colourCode= "joined";

    else if (field==='Offer Released')
    colourCode= "OfferRelaesed";
    
    else if (field==='Offer in Progress')
    colourCode= "OfferRelaesed";
  
    else if (field==='InProgress')
    colourCode= "OfferInProgress";
    
    else if (field==='YetToStart')
     colourCode= "Yet-to-start";

  
    else
    colourCode= "default";

   // console.log(" id returned :: "+colourCode);

    return colourCode;

  }

 //Changes end       
public pie_chartClicked(e: any): void {
console.log(e);
}
public pie_chartHovered(e: any): void { 
console.log("on hover "+e);

}

} 

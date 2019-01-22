
import { Component, OnInit } from '@angular/core';
import { CandidatureDetailsService } from './../_services/candidature-details.service';
import { CandidatureDetails } from '../_models';
import { first } from 'rxjs/operators';
import { chart } from '../_models/chart';

@Component({
selector: 'app-summary',
templateUrl: './summary.component.html',
styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
candidatures: CandidatureDetails[] = [];
public pie_chartType: string = 'bar';
chartRawData: chart;
showTable:boolean;
public pie_chartLabels: Array<String> = [];
public pie_chartDatasets: Array<any> = [];
constructor( private candidatureDetailsService: CandidatureDetailsService) { 
}

ngOnInit() {
this.candidatureDetailsService.getCandidaturesChart('client').pipe(first()).subscribe(candidatureFromService => { 
this.chartRawData = candidatureFromService; 
console.log('chartRawData ::' +this.chartRawData.chartDatasets[1].data);
this.pie_chartLabels=this.chartRawData.chartLabels;
this.pie_chartDatasets=this.chartRawData.chartDatasets;
if(this.pie_chartLabels.length>0){
this.showTable=true;
}
});
}
public pie_chartClicked(e: any): void {
console.log(e);
}
public pie_chartHovered(e: any): void { 
console.log("on hover "+e);

}

} 

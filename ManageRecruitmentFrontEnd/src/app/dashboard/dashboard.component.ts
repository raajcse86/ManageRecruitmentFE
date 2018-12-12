import { ChartData } from './../_models/chartData';
import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min.js';
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
  public pie_chartLabels: Array<any> = [];
 public pie_chartDatasets: Array<any> = [];
  public pie_chartType: string = 'pie';
  public data: Array<any> = [];
  chartData:Array<ChartData> = []
  chartObj:ChartData = {data:[],labels:''};
  public pie_chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870'],
      borderWidth: 2,
    }
  ];

  public pie_chartOptions: any = {
    responsive: true
  };
  public pie_chartClicked(e: any): void { }
  public pie_chartHovered(e: any): void { }

  ngOnInit(){
    this.candidatureDetailsService.getCandidatureStatusCountByClientName('Dell')
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


  

  


  
  

}


import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  //CanvasJS: any;
  constructor() { }

  public pie_chartType: string = 'pie';
  public pie_chartDatasets: Array<any> = [
    { data: [300, 50, 100, 40, 120], label: 'My First dataset' }
  ];
  public pie_chartLabels: Array<any> = ['DELL', 'SAP', 'EMC2', 'JPMorgan', 'Wipro'];
  public pie_chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];
  public pie_chartOptions: any = {
    responsive: true
  };
  public pie_chartClicked(e: any): void { }
  public pie_chartHovered(e: any): void { }

}

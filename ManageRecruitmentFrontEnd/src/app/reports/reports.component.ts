import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import 'chartjs-plugin-datalabels';
import {SelectItem} from 'primeng/api';
import {IEmployee} from 'node_modules/ng2-org-chart/src/employee';
import {TreeNode} from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidatureDetailsService } from './../_services/candidature-details.service';
import { first } from 'rxjs/operators';


interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styles: [`
        .company.ui-organizationchart .ui-organizationchart-node-content.ui-person {
            padding: 0;
            border: 0 none;
            font-weight: bold;
        }

        .node-header,.node-content {
            padding: .5em .7em;
        }

        .node-header {
            background-color: #495ebb;
            color: #ffffff;
        }

        .node-content {
            text-align: center;
            border: 1px solid #495ebb;
        }

        .node-content img {
            border-radius: 50%;
        }

        .department-cfo {
            background-color: #7247bc;
            color: #ffffff;
        }

        .department-coo {
            background-color: #a534b6;
            color: #ffffff;
        }

        .department-cto {
            background-color: #e9286f;
            color: #ffffff;
        }

        .ui-person .ui-node-toggler {
            color: #495ebb !important;
        }

        .department-cto .ui-node-toggler {
            color: #8a0a39 !important;
        }
    `],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class ReportsComponent implements OnInit {

    data: TreeNode[];
    cols: any[];
  cities1: SelectItem[];
    
    cities2: City[];

    selectedCity1: City;
    
    selectedCity2: City;

  constructor(private candidatureDetailsService : CandidatureDetailsService,
    private messageService:MessageService,private router: Router) { 

  //An array of cities
  this.cities2 = [
      {name: 'Client', code: 'client'},
      {name: 'Location', code: 'location'}
  ];
  }
  yaxisscale =0;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    plugins: {
      datalabels: {
        color: '#000000',
        font: {
          weight:'bold',
          size:12
        },
        align:'end',
        anchor:'end', 
        formatter: Math.round
      }
    },
    legend: {
      display: true
    },
    scales: {
    yAxes: [{
         ticks: {
            max: 0
        }
        

    }]
}
  };
  public barChartLabels = [];
  public barChartyAxisID = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    // {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    // {data: [18, 28, 30, 29, 56, 17, 19], label: 'Series C'},
    // {data: [19, 29, 39, 0, 58, 19, 21], label: 'Series D'}
  ];

  ngOnInit() {
    this.cols = [
        // { field: 'contactNo', header: 'ID' },
         { field: 'roleOfResponsibilities', header: 'FIELD' },
         { field: 'candidateName', header: 'COUNT' }
     ];

     this.candidatureDetailsService.getCandidaturesReports('client').subscribe(candidatureFromService => { 
      this.data=candidatureFromService;
 
        });

    this.candidatureDetailsService.getCandidaturesReportsBarGraph('client').subscribe(candidatureFromService => { 
    this.barChartData=candidatureFromService.chartDatasets;
    this.barChartLabels=candidatureFromService.chartLabels;
    this.barChartOptions.scales.yAxes[0].ticks.max=candidatureFromService.yaxisScale;
       
    });

    //  this.data =  [{
    //     label: 'Total Number of Applicants',
    //     type: 'person',
    //     styleClass: 'ui-person',
    //     expanded: true,
    //     data: {name:'100'},
    //     children: [
    //         {
    //             label: 'Interview In Progress',
    //             type: 'person',
    //             styleClass: 'ui-person',
    //             expanded: true,
    //             data: {name:'25'},
    //             children:[{
    //                 label: 'Dell',
    //                 type: 'person',
    //                 styleClass: 'ui-person',
    //                 expanded: true,
    //                 data: {name:'5'}, 
    //                 children:null
    //             },
    //             {
    //                 label: 'EMC',
    //                 type: 'person',
    //                 styleClass: 'ui-person',
    //                 expanded: true,
    //                 data: {name:'20'}
    //             }],
    //         },
    //         {
    //             label: 'Joined',
    //             type: 'person',
    //             styleClass: 'ui-person',
    //             expanded: true,
    //             data: {name:'Mike E.'},
    //             children:[{
    //                 label: 'Operations',
    //                 styleClass: 'department-coo'
    //             }]
    //         },
    //         {
    //             label: 'CTO',
    //             type: 'person',
    //             styleClass: 'ui-person',
    //             expanded: true,
    //             data: {name:'Jesse Pinkman'},
    //             children:[{
    //                 label: 'Development',
    //                 styleClass: 'department-cto',
    //                 expanded: true,
    //                 children:[{
    //                     label: 'Analysis',
    //                     styleClass: 'department-cto'
    //                 },
    //                 {
    //                     label: 'Front End',
    //                     styleClass: 'department-cto'
    //                 },
    //                 {
    //                     label: 'Back End',
    //                     styleClass: 'department-cto'
    //                 }]
    //             },
    //             {
    //                 label: 'QA',
    //                 styleClass: 'department-cto'
    //             },
    //             {
    //                 label: 'R&D',
    //                 styleClass: 'department-cto'
    //             }]
    //         }
    //     ]
    // }];

  }

  onNodeSelect(event) {
    this.messageService.add({severity: 'success', summary: 'Node Selected', detail: event.node.label});
}

}
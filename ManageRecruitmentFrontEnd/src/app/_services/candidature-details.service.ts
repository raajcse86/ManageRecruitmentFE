import { SummaryDataClient } from './../_models/summaryDataClient';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CandidatureDetails } from '../_models';
import { chart } from '../_models/chart';

@Injectable({
  providedIn: 'root'
})
export class CandidatureDetailsService {

  API_URL  =  'http://localhost:9000';

    constructor(private http: HttpClient) { }

    getCandidatures(){
        return this.http.get<CandidatureDetails[]>(`${this.API_URL}/api/candidatureDetails`);
    }

    getCandidaturesChart(Criteria : string){
        return this.http.get<chart>(`${this.API_URL}/api/candidatureDetailsBy/`+Criteria);
    }

    getCandidaturesSecondaryChart(Criteria : string,Category : string,Type : string){
        return this.http.get<CandidatureDetails[]>(`${this.API_URL}/api/candidatureDetailsBy/`+Criteria+"/"+Category+"/and/"+Type);
    }

    getCandidatureStatusCountByClientName(clientName: string){
      return this.http.get<CandidatureDetails[]>(`${this.API_URL}/api/candidatureDetailsByClientName/`+clientName);
  }

  getSummaryDataClient(){
    return this.http.get<SummaryDataClient[]>(`${this.API_URL}/api/candidatureDetailsSummaryDataByClient/`);
}
    
    updateCandidature(candidature: CandidatureDetails) {
        console.log("candidate id >> "+candidature.id);
        return this.http.put(`${this.API_URL}/api/candidatureDetails/` + candidature.id,candidature);
        
    }

    saveCandidature(CandidatureDetails) {
        console.log('some Test');
        console.log('candidature :: '+CandidatureDetails);
       // let addcan=JSON.stringify(CandidatureDetails);
        console.log("API URL is :: "+this.API_URL);
        let addURL=this.API_URL+"/api/candidatureDetails";
        console.log(addURL);
       this.http.post(addURL,CandidatureDetails)
       /*.subscribe(
           data=>{
               console.log("POST req is successful :: ",data);
           }
       );*/;
        
        }

    deleteCandidature(id: string) {
        return this.http.delete(`${this.API_URL}/api/candidatureDetails/` + id);
    }
}

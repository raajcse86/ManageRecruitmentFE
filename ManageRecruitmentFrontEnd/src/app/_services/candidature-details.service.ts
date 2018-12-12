import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CandidatureDetails } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class CandidatureDetailsService {

  API_URL  =  'http://localhost:9000';

    constructor(private http: HttpClient) { }

    getCandidatures(){
        return this.http.get<CandidatureDetails[]>(`${this.API_URL}/api/candidatureDetails`);
    }

    getCandidatureStatusCountByClientName(clientName: string){
      return this.http.get<CandidatureDetails[]>(`${this.API_URL}/api/candidatureDetailsByClientName/`+clientName);
  }
    
    updateCandidature(candidature: CandidatureDetails) {
        console.log("candidate id >> "+candidature.id);
        return this.http.put(`${this.API_URL}/api/candidatureDetails/` + candidature.id,candidature);
        
    }

    deleteCandidature(id: string) {
        return this.http.delete(`${this.API_URL}/api/candidatureDetails/` + id);
    }
}

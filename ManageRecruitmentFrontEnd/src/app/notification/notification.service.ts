import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  //private baseUrl= "http://localhost:9001";

  private baseUrl= "https://registeruserservicesapp.cfapps.io/";
  private API_URL= "https://recruitmentportalapp.cfapps.io"q;

  constructor(private http: HttpClient) { }

  public loadAllApprovals():Observable<any>{
    return this.http.get(`${this.baseUrl}/users`);
  }

  public updateApprovalStatus(user: any):Observable<any>{
    return this.http.put(`${this.baseUrl}/users/update`, user);
  }
  
  public approveUser(user: any):Observable<any>{
    return this.http.post(`${this.API_URL}/userDetails`, user);
  }
  
  
}

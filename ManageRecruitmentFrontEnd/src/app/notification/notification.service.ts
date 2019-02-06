import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl= "http://localhost:9000";

  constructor(private http: HttpClient) { }


  public loadAllApprovals():Observable<any>{
    return this.http.get(`${this.baseUrl}/users`);
  }

  public updateApprovalStatus(user: any):Observable<any>{
    return this.http.put(`${this.baseUrl}/users/update`, user);
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { environment } from '../../environments/environment';
import { User } from '../_models';
import { EmployeeDetails } from '../_models';
import { CandidatureDetails } from '../_models';
import { MessageService } from 'primeng/components/common/messageservice';

@Injectable()
export class UserService {
    API_URL  =  'http://localhost:9000';

    constructor(private http: HttpClient) { }

    getEmployeesTemp(){
        this.http.get(`${this.API_URL}/api/employeeDetails`).subscribe((data: Array<Object>) =>{
            console.log(data);
            return data;
        });
    }

    getEmployees(){
        return this.http.get<EmployeeDetails[]>(`${this.API_URL}/api/employeeDetails`);
    }
    getCandidatures(){
        return this.http.get<CandidatureDetails[]>(`${this.API_URL}/api/candidatureDetails`);
    }
    
    updateCandidature(candidature: CandidatureDetails) {
        console.log("candidate id >> "+candidature.id);
        return this.http.put(`${this.API_URL}/api/candidatureDetails/` + candidature.id,candidature);
        
    }

    deleteCandidature(id: string) {
        return this.http.delete(`${this.API_URL}/api/candidatureDetails/` + id);
    }
    
    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/` + id);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/` + id);
    }
}
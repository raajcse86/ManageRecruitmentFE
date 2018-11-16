﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { EmployeeDetails } from '../_models';

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
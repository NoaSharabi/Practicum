import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'https://localhost:7276/api/';

  getEmployees(): Observable<any>{
    return this.http.get(`${this.baseUrl}Employees`)
  }
}
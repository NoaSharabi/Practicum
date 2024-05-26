import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'https://localhost:7276/api';

  getEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Employees`)
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Employees/${id}`)
  }
  addEmployee(newEmployee: Employee): Observable<any> {
    return this.http.post(`${this.baseUrl}/Employees`, newEmployee)
  }
  updateEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Employees/${id}`)
    //return this.http.put(`${this.baseUrl}/Employees/${id}`)
  }
}

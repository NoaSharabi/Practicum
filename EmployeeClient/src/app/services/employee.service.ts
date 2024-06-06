import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'https://localhost:7276/api/Employees';

  getEmployees(): Observable<any> {
    return this.http.get(this.baseUrl)
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
  addEmployee(newEmployee: Employee): Observable<any> {
    return this.http.post(this.baseUrl, newEmployee)
  }
  updateEmployee(id: number, updatedEmployee: Employee): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updatedEmployee);
  }
}

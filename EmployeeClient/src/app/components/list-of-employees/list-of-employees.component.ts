import { Component } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-list-of-employees',
  standalone: true,
  imports: [],
  templateUrl: './list-of-employees.component.html',
  styleUrl: './list-of-employees.component.scss'
})
export class ListOfEmployeesComponent {
  employeesList: Employee[] = [];
  constructor(private employeeService: EmployeeService) { }
  ngOnInit() {
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.employeesList = res;
        console.log("list", this.employeesList)
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}

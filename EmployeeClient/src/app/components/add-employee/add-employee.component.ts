import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Employee, EmployeeRole, Gender } from '../../models/employee.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    RouterOutlet,
    FormsModule,
    NgFor,
    CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  newEmployee: Employee = new Employee
  identity!: string
  firstName!: string
  lastName!: string
  startDate!: Date
  birthDate!: Date
  gender!: Gender
  roles!: EmployeeRole[]
  newEmployeeRole: EmployeeRole = new EmployeeRole
  roleId!: number
  roleStartDate!: Date
  isManagement!: boolean
  constructor(){}
  addEmployee() {
    this.newEmployee.identity = this.identity
    this.newEmployee.firstName = this.firstName
    this.newEmployee.lastName = this.lastName
    this.newEmployee.startDate = this.startDate
    this.newEmployee.birthDate = this.birthDate
    this.newEmployee.gender = this.gender
    this.newEmployee.roles = this.roles
    console.log("new", this.newEmployee)
  }
  addRole() {
    this.newEmployeeRole.roleId = this.roleId
    this.newEmployeeRole.roleId = this.roleId
    this.newEmployeeRole.isManagement = this.isManagement
  }
}

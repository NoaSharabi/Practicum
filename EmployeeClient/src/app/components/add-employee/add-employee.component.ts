import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Employee, EmployeeRole, Gender, Role } from '../../models/employee.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EmployeeService } from '../../services/employee.service';
import { RoleService } from '../../services/role.service';

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
    CommonModule,
    MatDatepickerModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class AddEmployeeComponent implements OnInit {
  newEmployee: Employee = new Employee()
  employeeRole: EmployeeRole = new EmployeeRole()
  roles: Role[] = []
  form!: FormGroup
  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private roleService: RoleService) {
    this.initValidations()
  }

  ngOnInit(): void {
    this.getRoles()
  }

  getRoles() {
    this.roleService.getRoles().subscribe(res => {
      this.roles = res
    }, err => {
      this.roles = []
    })
  }

  initValidations() {
    this.form = this.fb.group({
      identity: [{ value: '', disabled: false }, [Validators.required]],
      first_name: [{ value: '', disabled: false }, [Validators.required]],
      last_name: [{ value: '', disabled: false }, [Validators.required]],
      start_date: [{ value: '', disabled: false }, [Validators.required]],
      birth_date: [{ value: '', disabled: false }, [Validators.required]],
      gender: [{ value: '', disabled: false }, [Validators.required]],
      role: [{ value: '', disabled: false }, [Validators.required]],
    })
  }

  addEmployee() {
    this.newEmployee.gender = parseInt(this.newEmployee.gender.toString())
    this.employeeRole.isManagement=true
    this.employeeRole.startDate=new Date()
    this.newEmployee.roles.push(this.employeeRole)
    this.employeeService.addEmployee(this.newEmployee).subscribe(res => {
    }, error => {
    })
  }
}

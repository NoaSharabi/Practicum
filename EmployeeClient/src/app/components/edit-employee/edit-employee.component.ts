import { NgFor, CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterOutlet } from '@angular/router';
import { Employee, Role } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-edit-employee',
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
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  updatedEmployee!: Employee;
  employeeRoles: number[] = [];
  roles: Role[] = [];
  form!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<EditEmployeeComponent>,
              private fb: FormBuilder, private employeeService: EmployeeService, private roleService: RoleService) {
    this.updatedEmployee = data;
    this.initValidations();
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getRoles();
    this.employeeRoles = this.updatedEmployee.roles.map(role => role.roleId);  // Update this line
  }

  getRoles() {
    this.roleService.getRoles().subscribe(res => {
      this.roles = res;
    }, err => {
      this.roles = [];
    });
  }

  compareFn(role1: any, role2: any): boolean {
    return role1 && role2 ? role1.id === role2.id : role1 === role2;
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
    });
  }

  updateEmployee() {
    this.updatedEmployee.gender = parseInt(this.updatedEmployee.gender.toString(), 10);
    this.updatedEmployee.roles = this.employeeRoles.map(roleId => ({
      roleId: parseInt(roleId.toString(), 10),
    }));

    this.employeeService.updateEmployee(this.updatedEmployee.id, this.updatedEmployee).subscribe(
      res => {
        console.log("Employee updated successfully");
      },
      error => {
        console.log("Error updating employee", error);
      });
  }
}

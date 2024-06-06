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
import { Employee, EmployeeRole, Role } from '../../models/employee.model';
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
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent implements OnInit {
  updatedEmployee!: Employee
  employeeRoles: any[] = []
  roles: Role[] = []
  form!: FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<EditEmployeeComponent>,
    private fb: FormBuilder, private employeeService: EmployeeService, private roleService: RoleService) {
    this.updatedEmployee = data;
    this.initValidations();
}

  close() {
    this.dialogRef.close();
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

  updateEmployee() {
    // המרת gender למספר
    this.updatedEmployee.gender = parseInt(this.updatedEmployee.gender.toString());

    // יצירת מערך רולים חדש
    this.updatedEmployee.roles = [];

    this.updatedEmployee.roles = this.employeeRoles.map(roleId => ({
      roleId: parseInt(roleId, 10),
    }))
    

    // הדפסת העובד לצורך ביצוע בדיקות ותיעוד
    console.log(this.updatedEmployee);
    console.log(this.employeeRoles);

    // נקודת עצירה לאפשרות נוחה יותר לבדיקת הקוד ב debugger
    debugger;

    // שליחת בקשת עדכון לשרת
    this.employeeService.updateEmployee(this.updatedEmployee.id, this.updatedEmployee).subscribe(res => {
      console.log("Employee updated successfully", res);
    }, error => {
      console.log("Error updating employee", error);
    });
  }
}

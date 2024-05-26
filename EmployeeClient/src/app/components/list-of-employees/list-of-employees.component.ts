import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog, MatDialogModule,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'app-list-of-employees',
  standalone: true,
  imports: [
    HttpClientModule,
    NgFor, 
    MatTableModule, 
    CommonModule,
    MatIconModule, 
    MatDialogModule,
    MatButtonModule],
  templateUrl: './list-of-employees.component.html',
  styleUrl: './list-of-employees.component.scss'
})
export class ListOfEmployeesComponent {
  displayedColumns: string[] = ['identity', 'firstName', 'lastName', 'startDate', 'actions']
  employeesList: Employee[] = [];
  constructor(private employeeService: EmployeeService, public dialog: MatDialog) { }
  ngOnInit() {
    this.get()
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEmployeeComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.get()
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialog2(id: number) {
    const dialogRef = this.dialog.open(EditEmployeeComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  get() {
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

  delete(id: number) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        console.log(`employee ${id} deleted`)
        this.get()
      },
      error: (err) => { console.log(`employee ${id} not deleted` + err) }
    })
  }
}

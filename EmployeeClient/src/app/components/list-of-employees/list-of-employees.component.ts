import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import * as XLSX from 'xlsx';

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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgModel } from '@angular/forms';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';

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
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './list-of-employees.component.html',
  styleUrl: './list-of-employees.component.scss'
})
export class ListOfEmployeesComponent {
  displayedColumns: string[] = ['identity', 'firstName', 'lastName', 'startDate', 'actions']
  employeesList: Employee[] = [];
  employeesListFilter: Employee[] = [];
  searchEmployee: string = ""
  constructor(private employeeService: EmployeeService, public dialog: MatDialog) { }
  ngOnInit() {
    this.get()
  }
  onKeyUP() {
    var temp = this.employeesList.filter(employee =>
      (employee.firstName.toLowerCase().includes(this.searchEmployee)) ||
      (employee.lastName.toLowerCase().includes(this.searchEmployee)) ||
      (employee.identity.includes(this.searchEmployee)));
    this.employeesListFilter = temp;
  }
  exportToExcel(): void {
    const originalTable = document.getElementById('employeesTable') as HTMLTableElement;
  if (originalTable) {
    // יצירת טבלה וירטואלית חדשה
    const virtualTable = document.createElement('table');

    // הוספת שורות וטורים מתוך הטבלה המקורית לטבלה הווירטואלית, חוץ מעמודת הפעולות
    const rows = Array.from(originalTable.rows);
    for (let row of rows) {
      const virtualRow = virtualTable.insertRow();
      const cells = Array.from(row.cells);
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if (i !== originalTable.rows[0].cells.length - 1) { // בדיקת מיקום עמודת actions
          const virtualCell = virtualRow.insertCell();
          virtualCell.innerHTML = cell.innerHTML;
        }
      }
    }

    // המרה של הטבלה הווירטואלית ל-Worksheet ול-Workbook
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(virtualTable);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'employees table.xlsx');
  } else {
    console.error("Table element with id 'employeesTable' not found.");
  }
  }
  openAdding() {
    const dialogRef = this.dialog.open(AddEmployeeComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.get()
      }
    });
  }
  openEditing(element: any) {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: '300px',
      data: JSON.parse(JSON.stringify(element))
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.get();
      }
    });
  }
  openDeleting(element: any) {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, { width: '400px', data: element });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.get()
      }
    });
  }
  get() {
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.employeesList = res;
        this.employeesListFilter = this.employeesList;
        console.log("list", this.employeesList)
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


}

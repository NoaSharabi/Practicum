import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ListOfEmployeesComponent } from './components/list-of-employees/list-of-employees.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule,
    ListOfEmployeesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}

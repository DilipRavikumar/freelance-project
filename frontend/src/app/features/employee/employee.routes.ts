import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './form/employee-form.component';

export const EMPLOYEE_ROUTES: Routes = [
  { path: 'new', component: EmployeeFormComponent },
  { path: ':id/edit', component: EmployeeFormComponent },
];

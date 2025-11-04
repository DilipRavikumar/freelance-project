import { Inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly baseUrl = '/api/employees';

  constructor(@Inject('ApiService') private apiService: ApiService) {}

  getEmployees(): Observable<Employee[]> {
    return this.apiService.get<Employee[]>(this.baseUrl);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.apiService.get<Employee>(`${this.baseUrl}/${id}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.apiService.post<Employee>(this.baseUrl, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.apiService.put<Employee>(`${this.baseUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.baseUrl}/${id}`);
  }

  getEmployeesByManager(managerId: number): Observable<Employee[]> {
    return this.apiService.get<Employee[]>(`${this.baseUrl}/manager/${managerId}`);
  }

  getEmployeesByCompany(companyId: number): Observable<Employee[]> {
    return this.apiService.get<Employee[]>(`${this.baseUrl}/company/${companyId}`);
  }
}

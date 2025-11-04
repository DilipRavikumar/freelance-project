import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonDirective, ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, TagModule, ConfirmDialogModule, ToastModule],
  providers: [ConfirmationService, MessageService],
  template: `
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-semibold text-gray-800">Employees</h1>
        <button
          pButton
          label="Add Employee"
          icon="pi pi-plus"
          class="p-button-success"
          (click)="navigateToCreate()"
        ></button>
      </div>

      <p-table
        [value]="employees"
        [paginator]="true"
        [rows]="10"
        styleClass="p-datatable-sm p-datatable-gridlines"
      >
        <ng-template pTemplate="header">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Domain</th>
            <th>Skills</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </ng-template>

        <ng-template pTemplate="body" let-employee>
          <tr>
            <td>{{ employee.employeeId }}</td>
            <td>
              <span class="cursor-pointer text-blue-600 hover:underline font-medium" (click)="viewEmployee(employee)">
                {{ employee.firstName }} {{ employee.lastName }}
              </span>
            </td>
            <td>{{ employee.email }}</td>
            <td>{{ employee.domain || 'N/A' }}</td>
            <td>
              <span class="text-sm">{{ (employee.skills || 'N/A') | slice:0:30 }}{{ (employee.skills?.length || 0) > 30 ? '...' : '' }}</span>
            </td>
            <td>
              <p-tag
                [value]="employee.status"
                [severity]="employee.status === 'Active' ? 'success' : 'danger'"
              >
              </p-tag>
            </td>
            <td>
              <div class="flex gap-2">
                <button
                  pButton
                  icon="pi pi-eye"
                  class="p-button-rounded p-button-info p-button-sm"
                  (click)="viewEmployee(employee)"
                ></button>
                <button
                  pButton
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-warning p-button-sm"
                  (click)="editEmployee(employee)"
                ></button>
                <button
                  pButton
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-danger p-button-sm"
                  (click)="confirmDelete(employee)"
                ></button>
              </div>
            </td>
          </tr>
        </ng-template>

        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="7" class="text-center p-4">No employees found.</td>
          </tr>
        </ng-template>
      </p-table>

      <p-confirmDialog
        header="Confirm Deletion"
        icon="pi pi-exclamation-triangle"
      ></p-confirmDialog>
      <p-toast></p-toast>
    </div>
  `,
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => (this.employees = data),
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load employees',
        });
      },
    });
  }

  navigateToCreate() {
    this.router.navigate(['/employees/create']);
  }

  viewEmployee(employee: Employee) {
    this.router.navigate(['/employees', employee.employeeId]);
  }

  editEmployee(employee: Employee) {
    this.router.navigate(['/employees', employee.employeeId, 'edit']);
  }

  confirmDelete(employee: Employee) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`,
      accept: () => {
        this.employeeService.deleteEmployee(employee.employeeId!).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Employee deleted successfully',
            });
            this.loadEmployees();
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete employee',
            });
          },
        });
      },
    });
  }
}

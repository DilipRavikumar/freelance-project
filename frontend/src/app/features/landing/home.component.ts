import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TableModule,
    TagModule,
    DialogModule
  ],
  template: `
    <div class="min-h-screen bg-gray-50">
      <nav class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <h1 class="text-xl font-semibold text-gray-900">Freelance Platform</h1>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-700">Welcome, {{ currentUser?.email }}</span>
              <button pButton type="button" label="Logout" class="p-button-outlined p-button-sm" (click)="logout()"></button>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <p-card>
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600">{{ employees.length }}</div>
                <div class="text-sm text-gray-600">Total Freelancers</div>
              </div>
            </p-card>
            <p-card>
              <div class="text-center">
                <div class="text-3xl font-bold text-green-600">{{ activeEmployees }}</div>
                <div class="text-sm text-gray-600">Active Freelancers</div>
              </div>
            </p-card>
            <p-card>
              <div class="text-center">
                <div class="text-3xl font-bold text-orange-600">{{ uniqueDomains }}</div>
                <div class="text-sm text-gray-600">Domains</div>
              </div>
            </p-card>
          </div>

          <!-- Recent Employees Section -->
          <p-card header="Recent Employees" class="mb-6">
            <p-table [value]="employees.slice(0, 5)" styleClass="p-datatable-sm">
              <ng-template pTemplate="header">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Designation</th>
                  <th>Status</th>
                  <th>Hire Date</th>
                  <th>Actions</th>
                </tr>
              </ng-template>
              <ng-template pTemplate="body" let-employee>
                <tr>
                  <td>{{ employee.firstName }} {{ employee.lastName }}</td>
                  <td>{{ employee.email }}</td>
                  <td>{{ employee.designationId }}</td>
                  <td>
                    <p-tag [value]="employee.status" [severity]="employee.status === 'Active' ? 'success' : 'danger'"></p-tag>
                  </td>
                  <td>{{ employee.hireDate | date:'M/d/yy' }}</td>
                  <td>
                    <button
                      pButton
                      label="View"
                      class="p-button-info p-button-sm"
                      (click)="viewEmployeeDetails(employee)"
                    ></button>
                  </td>
                </tr>
              </ng-template>
            </p-table>
          </p-card>
        </div>
      </div>
    </div>

    <!-- Employee Details Dialog -->
    <p-dialog header="Complete Employee Details" [(visible)]="showEmployeeDialog" [modal]="true" [style]="{width: '80vw', maxWidth: '1000px'}" [draggable]="false" [resizable]="false">
      <div *ngIf="selectedEmployee" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Personal Information -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h3>
          <div class="space-y-2">
            <div><span class="font-medium">Employee ID:</span> {{ selectedEmployee.employeeId }}</div>
            <div><span class="font-medium">Full Name:</span> {{ selectedEmployee.firstName }} {{ selectedEmployee.lastName }}</div>
            <div><span class="font-medium">Email:</span> {{ selectedEmployee.email }}</div>
            <div><span class="font-medium">Phone:</span> {{ selectedEmployee.phoneNumber || 'Not provided' }}</div>
            <div><span class="font-medium">Date of Birth:</span> {{ selectedEmployee.dateOfBirth | date:'dd/MM/yyyy' }}</div>
            <div><span class="font-medium">Gender:</span> {{ selectedEmployee.gender }}</div>
          </div>
        </div>

        <!-- Professional Information -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">Professional Information</h3>
          <div class="space-y-2">
            <div><span class="font-medium">Domain:</span> <p-tag [value]="selectedEmployee.domain || 'Not specified'" severity="info"></p-tag></div>
            <div><span class="font-medium">Skills:</span> {{ selectedEmployee.skillsString || selectedEmployee.skills || 'Not specified' }}</div>
            <div><span class="font-medium">Designation ID:</span> {{ selectedEmployee.designationId || 'Not assigned' }}</div>
            <div><span class="font-medium">Manager ID:</span> {{ selectedEmployee.managerId || 'No manager' }}</div>
            <div><span class="font-medium">Company ID:</span> {{ selectedEmployee.companyId || 'Not assigned' }}</div>
            <div><span class="font-medium">Hire Date:</span> {{ selectedEmployee.hireDate | date:'dd/MM/yyyy' }}</div>
            <div><span class="font-medium">Status:</span> <p-tag [value]="selectedEmployee.status" [severity]="selectedEmployee.status === 'Active' ? 'success' : 'danger'"></p-tag></div>
          </div>
        </div>

        <!-- Financial Information -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">Financial Information</h3>
          <div class="space-y-2">
            <div><span class="font-medium">Salary:</span> <span class="text-green-600 font-semibold">₹{{ selectedEmployee.salary | number:'1.0-0' }}</span> per month</div>
            <div><span class="font-medium">Bank Name:</span> {{ selectedEmployee.bankName }}</div>
            <div><span class="font-medium">Account Number:</span> {{ selectedEmployee.bankAccountNumber }}</div>
            <div><span class="font-medium">IFSC Code:</span> {{ selectedEmployee.ifscCode || 'Not provided' }}</div>
            <div><span class="font-medium">PAN Number:</span> <span class="font-mono">{{ selectedEmployee.panNumber }}</span></div>
          </div>
        </div>

        <!-- Social & Additional Information -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">Social & Additional</h3>
          <div class="space-y-2">
            <div><span class="font-medium">LinkedIn:</span> 
              <a *ngIf="selectedEmployee.linkedinUrl" [href]="selectedEmployee.linkedinUrl" target="_blank" class="text-blue-600 hover:underline ml-2">
                {{ selectedEmployee.linkedinUrl }} ↗
              </a>
              <span *ngIf="!selectedEmployee.linkedinUrl" class="text-gray-500 ml-2">Not provided</span>
            </div>
            <div><span class="font-medium">GitHub:</span> 
              <a *ngIf="selectedEmployee.githubUrl" [href]="selectedEmployee.githubUrl" target="_blank" class="text-gray-800 hover:underline ml-2">
                {{ selectedEmployee.githubUrl }} ↗
              </a>
              <span *ngIf="!selectedEmployee.githubUrl" class="text-gray-500 ml-2">Not provided</span>
            </div>
            <div><span class="font-medium">Photo URL:</span> 
              <a *ngIf="selectedEmployee.photoUrl" [href]="selectedEmployee.photoUrl" target="_blank" class="text-purple-600 hover:underline ml-2">
                View Photo ↗
              </a>
              <span *ngIf="!selectedEmployee.photoUrl" class="text-gray-500 ml-2">Not provided</span>
            </div>
            <div><span class="font-medium">Created:</span> {{ selectedEmployee.createdAt ? (selectedEmployee.createdAt | date:'dd/MM/yyyy HH:mm') : 'Not available' }}</div>
            <div><span class="font-medium">Last Updated:</span> {{ selectedEmployee.updatedAt ? (selectedEmployee.updatedAt | date:'dd/MM/yyyy HH:mm') : 'Not available' }}</div>
          </div>
        </div>
      </div>
    </p-dialog>
  `
})
export class HomeComponent implements OnInit {
  employees: any[] = [];
  loading = false;
  currentUser: any;
  showEmployeeDialog = false;
  selectedEmployee: any = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading = true;
    this.apiService.get<any[]>('/api/employees').subscribe({
      next: (data) => {
        console.log('Loaded employees:', data);
        this.employees = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.loading = false;
      }
    });
  }

  get activeEmployees(): number {
    return this.employees.filter(emp => emp.status === 'Active').length;
  }

  get companies(): number {
    const uniqueCompanies = new Set(this.employees.map(emp => emp.companyId));
    return uniqueCompanies.size;
  }

  get uniqueDomains(): number {
    const domains = new Set(this.employees.filter(emp => emp.domain).map(emp => emp.domain));
    return domains.size;
  }

  viewEmployeeDetails(employee: any) {
    this.selectedEmployee = employee;
    this.showEmployeeDialog = true;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
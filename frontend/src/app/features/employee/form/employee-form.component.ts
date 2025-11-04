import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
// primeng v20: Calendar -> DatePicker, Dropdown -> Select
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';

    
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    DatePickerModule,
    DividerModule,
    SelectModule,


    InputNumberModule,
    InputTextModule,
    ToastModule,
  ],
  providers: [MessageService],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <div class="p-6">
      <div class="mb-6">
        <h1 class="text-3xl font-semibold text-gray-800">
          {{ isEditMode ? 'Edit Employee' : 'Create Employee' }}
        </h1>
      </div>

      <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()" class="max-w-3xl">
        <p-card>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Personal Information -->
            <div class="col-span-2">
              <p-divider align="left">
                <span class="text-lg font-medium">Personal Information</span>
              </p-divider>
            </div>

            <div class="form-field">
              <label for="firstName">First Name*</label>
              <input pInputText id="firstName" formControlName="firstName" class="w-full" />
              <small class="text-red-500" *ngIf="isFieldInvalid('firstName')">
                First name is required and must contain only letters
              </small>
            </div>

            <div class="form-field">
              <label for="lastName">Last Name*</label>
              <input pInputText id="lastName" formControlName="lastName" class="w-full" />
              <small class="text-red-500" *ngIf="isFieldInvalid('lastName')">
                Last name is required and must contain only letters
              </small>
            </div>

            <div class="form-field">
              <label for="email">Email*</label>
              <input pInputText id="email" formControlName="email" class="w-full" />
              <small class="text-red-500" *ngIf="isFieldInvalid('email')">
                Valid email is required
              </small>
            </div>

            <div class="form-field">
              <label for="phoneNumber">Phone Number</label>
              <input pInputText id="phoneNumber" formControlName="phoneNumber" class="w-full" />
              <small class="text-red-500" *ngIf="isFieldInvalid('phoneNumber')">
                Phone number must be 10 digits
              </small>
            </div>

            <div class="form-field">
              <label for="dateOfBirth">Date of Birth</label>
              <p-datepicker
                id="dateOfBirth"
                formControlName="dateOfBirth"
                [maxDate]="today"
                dateFormat="yy-mm-dd"
                class="w-full"
              ></p-datepicker>
            </div>

            <div class="form-field">
              <label for="gender">Gender</label>
              <p-select
                id="gender"
                formControlName="gender"
                [options]="genderOptions"
                placeholder="Select Gender"
                class="w-full"
              ></p-select>
            </div>

            <!-- Employment Information -->
            <div class="col-span-2">
              <p-divider align="left">
                <span class="text-lg font-medium">Employment Information</span>
              </p-divider>
            </div>

            <div class="form-field">
              <label for="hireDate">Hire Date*</label>
              <p-datepicker
                id="hireDate"
                formControlName="hireDate"
                dateFormat="yy-mm-dd"
                class="w-full"
              ></p-datepicker>
              <small class="text-red-500" *ngIf="isFieldInvalid('hireDate')">
                Hire date is required
              </small>
            </div>

            <div class="form-field">
              <label for="salary">Salary*</label>
              <p-inputNumber
                id="salary"
                formControlName="salary"
                mode="currency"
                currency="INR"
                locale="en-IN"
                class="w-full"
              ></p-inputNumber>
              <small class="text-red-500" *ngIf="isFieldInvalid('salary')">
                Valid salary is required
              </small>
            </div>

            <!-- Bank Information -->
            <div class="col-span-2">
              <p-divider align="left">
                <span class="text-lg font-medium">Bank Information</span>
              </p-divider>
            </div>

            <div class="form-field">
              <label for="bankName">Bank Name*</label>
              <input pInputText id="bankName" formControlName="bankName" class="w-full" />
              <small class="text-red-500" *ngIf="isFieldInvalid('bankName')">
                Bank name is required
              </small>
            </div>

            <div class="form-field">
              <label for="bankAccountNumber">Account Number*</label>
              <input
                pInputText
                id="bankAccountNumber"
                formControlName="bankAccountNumber"
                class="w-full"
              />
              <small class="text-red-500" *ngIf="isFieldInvalid('bankAccountNumber')">
                Valid account number is required
              </small>
            </div>

            <div class="form-field">
              <label for="ifscCode">IFSC Code</label>
              <input pInputText id="ifscCode" formControlName="ifscCode" class="w-full" />
              <small class="text-red-500" *ngIf="isFieldInvalid('ifscCode')">
                Valid IFSC code is required
              </small>
            </div>

            <div class="form-field">
              <label for="panNumber">PAN Number*</label>
              <input pInputText id="panNumber" formControlName="panNumber" class="w-full" />
              <small class="text-red-500" *ngIf="isFieldInvalid('panNumber')">
                Valid PAN number is required
              </small>
            </div>

            <!-- Freelancing Skills & Domain -->
            <div class="col-span-2">
              <p-divider align="left">
                <span class="text-lg font-medium">Freelancing Information</span>
              </p-divider>
            </div>

            <div class="form-field">
              <label for="skills">Skills*</label>
              <input pInputText id="skills" formControlName="skills" class="w-full" placeholder="JavaScript, React, Node.js, Python" />
              <small class="text-red-500" *ngIf="isFieldInvalid('skills')">
                Skills are required
              </small>
            </div>

            <div class="form-field">
              <label for="domain">Domain*</label>
              <p-select
                id="domain"
                formControlName="domain"
                [options]="domainOptions"
                placeholder="Select Domain"
                class="w-full"
              ></p-select>
              <small class="text-red-500" *ngIf="isFieldInvalid('domain')">
                Domain is required
              </small>
            </div>

            <!-- Social Links -->
            <div class="col-span-2">
              <p-divider align="left">
                <span class="text-lg font-medium">Social Links</span>
              </p-divider>
            </div>

            <div class="form-field">
              <label for="linkedinUrl">LinkedIn URL</label>
              <input pInputText id="linkedinUrl" formControlName="linkedinUrl" class="w-full" />
            </div>

            <div class="form-field">
              <label for="githubUrl">GitHub URL</label>
              <input pInputText id="githubUrl" formControlName="githubUrl" class="w-full" />
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <button
              pButton
              type="button"
              label="Cancel"
              class="p-button-secondary"
              (click)="goBack()"
            ></button>
            <button
              pButton
              type="submit"
              [label]="isEditMode ? 'Update' : 'Create'"
              [disabled]="employeeForm.invalid || isSaving"
            ></button>
          </div>
        </p-card>
      </form>

      <p-toast></p-toast>
    </div>
  `,
  styles: [
    `
      .form-field {
        @apply flex flex-col gap-2;
      }
      .form-field label {
        @apply text-sm font-medium text-gray-700;
      }
      :host ::ng-deep {
        .p-datepicker,
        .p-select,
        .p-inputnumber {
          @apply w-full;
        }
      }
    `,
  ],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode = false;
  isSaving = false;
  today = new Date();
  genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  domainOptions = [
    { label: 'Web Development', value: 'Web Development' },
    { label: 'Mobile Development', value: 'Mobile Development' },
    { label: 'Data Science', value: 'Data Science' },
    { label: 'UI/UX Design', value: 'UI/UX Design' },
    { label: 'DevOps', value: 'DevOps' },
    { label: 'Digital Marketing', value: 'Digital Marketing' },
    { label: 'Content Writing', value: 'Content Writing' },
    { label: 'Graphic Design', value: 'Graphic Design' },
  ];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.createForm();
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.loadEmployee(id);
    }
  }

  private createForm(): FormGroup {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.pattern('^[0-9]{10}$')]],
      dateOfBirth: [null],
      gender: [null],
      designationId: [null],
      hireDate: [null, Validators.required],
      salary: [null, [Validators.required, Validators.min(0)]],
      managerId: [null],
      projectId: [null],
      bankName: ['', Validators.required],
      bankAccountNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      ifscCode: ['', [Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')]],
      panNumber: ['', [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]],
      skills: ['', Validators.required],
      domain: ['', Validators.required],
      linkedinUrl: [''],
      githubUrl: [''],
      status: ['Active'],
    });
    return this.employeeForm;
  }

  loadEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue(employee);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load employee',
        });
        this.router.navigate(['/employees']);
      },
    });
  }

  onSubmit() {
    if (this.employeeForm.invalid) return;

    this.isSaving = true;
    const employee = this.employeeForm.value;

    const request = this.isEditMode
      ? this.employeeService.updateEmployee(this.route.snapshot.params['id'], employee)
      : this.employeeService.createEmployee(employee);

    request.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Employee ${this.isEditMode ? 'updated' : 'created'} successfully`,
        });
        this.router.navigate(['/employees']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Failed to ${this.isEditMode ? 'update' : 'create'} employee`,
        });
        this.isSaving = false;
      },
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.employeeForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
}

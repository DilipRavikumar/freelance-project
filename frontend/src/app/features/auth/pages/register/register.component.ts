import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    CardModule,
    ButtonModule,
    InputTextModule,
  ],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <div class="max-w-2xl w-full">
        <p-card header="Register as Freelancer" class="shadow-lg">
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <!-- Personal Information -->
            <div class="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label for="firstName" class="block text-sm font-medium mb-1">First Name *</label>
                <input pInputText id="firstName" formControlName="firstName" class="w-full" placeholder="John" />
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium mb-1">Last Name *</label>
                <input pInputText id="lastName" formControlName="lastName" class="w-full" placeholder="Doe" />
              </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label for="email" class="block text-sm font-medium mb-1">Email *</label>
                <input pInputText id="email" type="email" formControlName="email" class="w-full" placeholder="john@example.com" />
              </div>
              <div>
                <label for="phoneNumber" class="block text-sm font-medium mb-1">Phone Number</label>
                <input pInputText id="phoneNumber" formControlName="phoneNumber" class="w-full" placeholder="9876543210" />
              </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label for="dateOfBirth" class="block text-sm font-medium mb-1">Date of Birth</label>
                <input pInputText id="dateOfBirth" type="date" formControlName="dateOfBirth" class="w-full" />
              </div>
              <div>
                <label for="gender" class="block text-sm font-medium mb-1">Gender</label>
                <select pInputText id="gender" formControlName="gender" class="w-full">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <!-- Professional Information -->
            <div class="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label for="designationId" class="block text-sm font-medium mb-1">Designation ID</label>
                <input pInputText id="designationId" type="number" formControlName="designationId" class="w-full" placeholder="1" />
              </div>
              <div>
                <label for="salary" class="block text-sm font-medium mb-1">Expected Salary</label>
                <input pInputText id="salary" type="number" formControlName="salary" class="w-full" placeholder="50000" />
              </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label for="managerId" class="block text-sm font-medium mb-1">Manager ID</label>
                <input pInputText id="managerId" type="number" formControlName="managerId" class="w-full" placeholder="1" />
              </div>
              <div>
                <label for="companyId" class="block text-sm font-medium mb-1">Company ID</label>
                <input pInputText id="companyId" type="number" formControlName="companyId" class="w-full" placeholder="1" />
              </div>
            </div>
            
            <!-- Banking Information -->
            <div class="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label for="bankName" class="block text-sm font-medium mb-1">Bank Name *</label>
                <input pInputText id="bankName" formControlName="bankName" class="w-full" placeholder="HDFC Bank" />
              </div>
              <div>
                <label for="bankAccountNumber" class="block text-sm font-medium mb-1">Account Number *</label>
                <input pInputText id="bankAccountNumber" formControlName="bankAccountNumber" class="w-full" placeholder="12345678901" />
              </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label for="ifscCode" class="block text-sm font-medium mb-1">IFSC Code</label>
                <input pInputText id="ifscCode" formControlName="ifscCode" class="w-full" placeholder="HDFC0001234" />
              </div>
              <div>
                <label for="panNumber" class="block text-sm font-medium mb-1">PAN Number *</label>
                <input pInputText id="panNumber" formControlName="panNumber" class="w-full" placeholder="ABCDE1234F" />
              </div>
            </div>
            
            <!-- Freelancing Skills & Domain -->
            <div class="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label for="skills" class="block text-sm font-medium mb-1">Skills *</label>
                <input pInputText id="skills" formControlName="skills" class="w-full" placeholder="JavaScript, React, Node.js, Python" />
              </div>
              <div>
                <label for="domain" class="block text-sm font-medium mb-1">Domain *</label>
                <select pInputText id="domain" formControlName="domain" class="w-full">
                  <option value="">Select Domain</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Content Writing">Content Writing</option>
                  <option value="Graphic Design">Graphic Design</option>
                </select>
              </div>
            </div>
            
            <!-- Profile & Social Links -->
            <div class="mb-4">
              <label for="photoUrl" class="block text-sm font-medium mb-1">Profile Photo URL</label>
              <input pInputText id="photoUrl" formControlName="photoUrl" class="w-full" placeholder="https://example.com/photo.jpg" />
            </div>
            
            <div class="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label for="linkedinUrl" class="block text-sm font-medium mb-1">LinkedIn URL</label>
                <input pInputText id="linkedinUrl" formControlName="linkedinUrl" class="w-full" placeholder="https://linkedin.com/in/johndoe" />
              </div>
              <div>
                <label for="githubUrl" class="block text-sm font-medium mb-1">GitHub URL</label>
                <input pInputText id="githubUrl" formControlName="githubUrl" class="w-full" placeholder="https://github.com/johndoe" />
              </div>
            </div>
            
            <button pButton type="submit" label="Register" class="w-full" [loading]="loading"></button>
          </form>
          <div class="text-center mt-4">
            <a routerLink="/auth/login" class="text-sm text-blue-600 hover:underline">
              Already have an account? Login
            </a>
          </div>
        </p-card>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.pattern('^[0-9]{10}$')]],
      dateOfBirth: [''],
      gender: [''],
      designationId: [''],
      salary: [''],
      managerId: [''],
      companyId: [1],
      bankName: ['', [Validators.required]],
      bankAccountNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      ifscCode: ['', [Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')]],
      panNumber: ['', [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]],
      skills: ['', [Validators.required]],
      domain: ['', [Validators.required]],
      photoUrl: [''],
      linkedinUrl: [''],
      githubUrl: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    const formData = this.registerForm.value;
    
    const employeeData = {
      ...formData,
      hireDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };
    
    this.authService.register(employeeData).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration successful! Please login.' });
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Registration Failed', detail: error.message });
        this.loading = false;
      }
    });
  }
}

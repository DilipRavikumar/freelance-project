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
  selector: 'app-login',
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
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="max-w-md w-full">
        <p-card header="Login" class="shadow-lg">
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="mb-4">
              <label for="email" class="block text-sm font-medium mb-1">Email</label>
              <input
                pInputText
                id="email"
                type="email"
                formControlName="email"
                class="w-full"
                placeholder="Enter your email"
              />
            </div>
            <div class="mb-6">
              <label for="password" class="block text-sm font-medium mb-1">Password</label>
              <input
                pInputText
                id="password"
                type="password"
                formControlName="password"
                class="w-full"
                placeholder="Enter your password"
              />
            </div>
            <button pButton type="submit" label="Login" class="w-full" [loading]="loading"></button>
          </form>
          <div class="text-center mt-4">
            <a routerLink="/auth/register" class="text-sm text-blue-600 hover:underline">
              Don't have an account? Register
            </a>
          </div>
        </p-card>
      </div>
    </div>
  `,
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['john.doe@company.com', [Validators.required, Validators.email]],
      password: ['password123', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;
    
    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: error.message });
        this.loading = false;
      }
    });
  }
}

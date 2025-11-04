import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

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
            [ngClass]="{ 'ng-invalid ng-dirty': submitted && loginForm.get('email')?.errors }"
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
            [ngClass]="{ 'ng-invalid ng-dirty': submitted && loginForm.get('password')?.errors }"
          />
        </div>
        <button pButton type="submit" label="Login" class="w-full" [loading]="loading"></button>
      </form>
      <div class="text-center mt-4">
        <a routerLink="/auth/register" class="text-sm text-primary-600 hover:underline">
          Don't have an account? Register
        </a>
      </div>
    </p-card>
  `,
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    // TODO: Implement login logic
  }
}

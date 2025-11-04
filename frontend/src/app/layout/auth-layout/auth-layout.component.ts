import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule, ToastModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-surface-50">
      <div class="w-full max-w-md p-6">
        <router-outlet></router-outlet>
      </div>
    </div>
    <p-toast></p-toast>
  `,
})
export class AuthLayoutComponent {}

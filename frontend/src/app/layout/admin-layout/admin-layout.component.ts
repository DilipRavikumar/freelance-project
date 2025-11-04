import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule, ToastModule],
  template: `
    <div class="min-h-screen flex flex-col">
      <!-- Add admin navbar here -->
      <main class="flex-1 container mx-auto p-4">
        <router-outlet></router-outlet>
      </main>
    </div>
    <p-toast></p-toast>
  `,
})
export class AdminLayoutComponent {}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, ToastModule],
  template: `
    <main class="container mx-auto p-4">
      <router-outlet></router-outlet>
    </main>
    <p-toast></p-toast>
  `,
})
export class MainLayoutComponent {}

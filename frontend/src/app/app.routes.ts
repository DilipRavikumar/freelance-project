import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  // Landing page
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then((m) => m.LandingComponent),
  },

  // Auth routes (for guests only)
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },

  // Protected home route
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/landing/home.component').then((m) => m.HomeComponent),
  },

  // Catch all
  {
    path: '**',
    redirectTo: '/'
  }
];
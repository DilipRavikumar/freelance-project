import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        authService.logout();
        messageService.add({
          severity: 'error',
          summary: 'Unauthorized',
          detail: 'Please log in again.',
        });
      } else if (err.status === 403) {
        messageService.add({
          severity: 'error',
          summary: 'Access Denied',
          detail: 'You do not have permission.',
        });
        router.navigate(['/']);
      } else {
        // Show generic toast for other errors
        const errorMsg = err.error?.error || err.statusText || 'An unknown error occurred';
        messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
      }
      return throwError(() => err);
    })
  );
};

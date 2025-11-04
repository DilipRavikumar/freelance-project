import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, Role } from '../models/user.model';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/backend-dtos';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiService = inject(ApiService);
  private storageService = inject(StorageService);
  private router = inject(Router);

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.loadUserFromToken();
  }

  private loadUserFromToken(): void {
    const token = this.storageService.getToken();
    if (token) {
      try {
        const user = this.decodeToken(token);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        this.logout();
      }
    }
  }

  login(email: string, password: string): Observable<any> {
    return new Observable(observer => {
      this.apiService.get<any[]>('/api/employees').subscribe({
        next: (employees) => {
          const user = employees.find(emp => emp.email === email);
          if (user) {
            const mockUser = { id: user.employeeId, email: user.email, role: Role.USER };
            this.storageService.setToken('mock-jwt-token');
            this.storageService.setUser(mockUser);
            this.currentUserSubject.next(mockUser);
            this.isAuthenticatedSubject.next(true);
            observer.next(mockUser);
            observer.complete();
          } else {
            observer.error({ message: 'Invalid credentials' });
          }
        },
        error: () => observer.error({ message: 'Login failed' })
      });
    });
  }

  register(employeeData: any): Observable<any> {
    return this.apiService.post('/api/employees', employeeData);
  }

  logout(): void {
    this.storageService.clearAll();
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/']);
  }

  getCurrentUser(): any {
    return this.storageService.getUser();
  }

  private decodeToken(token: string): User {
    const user = this.storageService.getUser();
    return user || { role: Role.USER, id: 1 };
  }

  public hasRole(role: Role): boolean {
    return this.currentUserSubject.value?.role === role;
  }
}

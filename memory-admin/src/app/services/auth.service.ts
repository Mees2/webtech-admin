import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * AuthService handles JWT authentication with the memory backend
 * Manages login, token storage, and authorization headers
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8000';
  private readonly TOKEN_KEY = 'admin_token';
  private platformId = inject(PLATFORM_ID);
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;

  constructor(private http: HttpClient) {
    // Initialize after constructor so inject() is available
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  /**
   * Login with username and password to get JWT token
   */
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(`${this.API_URL}/memory/login`, body)
      .pipe(
        tap(response => {
          if (response.token) {
            this.setToken(response.token);
            this.isAuthenticatedSubject.next(true);
          }
        })
      );
  }

  /**
   * Logout and clear stored token
   */
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Store token in localStorage
   */
  private setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  /**
   * Get stored token
   */
  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.hasToken();
  }

  /**
   * Helper method to check if token exists
   */
  private hasToken(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Get authorization header with token
   */
  getAuthHeader(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /**
   * Verify if the current token is valid (check admin role)
   */
  verifyToken(): Observable<any> {
    const headers = this.getAuthHeader();
    return this.http.get(`${this.API_URL}/admin/aggregate`, { headers });
  }
}

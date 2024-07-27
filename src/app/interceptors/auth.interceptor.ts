import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment.prod';
// Import your authentication service

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  baseUrl = environment.baseUrl;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken(); // Replace with your method of getting the auth token

    let authReq = req;
    const excludedEndpoints = [
      `${this.baseUrl}/auth/signin`, // Add other endpoints if needed
      `${this.baseUrl}/auth/signup`, // Add other endpoints if needed
    ];

    if (excludedEndpoints.some(url => req.url.includes(url))) {
      return next.handle(req);
    }

    if (authToken) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }

    
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle unauthorized errors
          this.authService.logout(); // Replace with your logout method
        }
        return throwError(error);
      })
    );
    
  }

  private matchUrl(requestUrl: string, excludedUrl: string): boolean {
    const baseUrl = requestUrl.split('?')[0]; // Remove query parameters from request URL
    return baseUrl.startsWith(excludedUrl);
  }
}

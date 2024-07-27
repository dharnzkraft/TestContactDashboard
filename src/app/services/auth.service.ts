import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient,
  ) { }

  login(payload: any){
    return this.http.post(this.baseUrl+`/auth/signin`, payload);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    // Redirect to login or handle logout
  }
}

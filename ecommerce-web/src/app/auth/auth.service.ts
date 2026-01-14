import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  roles?: string[];
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:8081/auth';

  constructor(private http: HttpClient) {}

  login(email: string, contrasenia: string) {
    return this.http.post<any>(`${this.API_URL}/login`, {
      email,
      contrasenia
    }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  private decodeToken(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  }

  getEmail(): string | null {
    return this.decodeToken()?.sub ?? null;
  }

  isTokenValid(): boolean {
  const token = this.getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  } catch {
    return false;
  }
}

isTokenExpired(): boolean {
  return !this.isTokenValid();
}


  isLogged(): boolean {
    return !!this.getToken() && !this.isTokenExpired();
  }

  getUserRole(): string | null {
    return this.decodeToken()?.roles?.[0] ?? null;
  }

  getRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roles ?? [];
  }

  isAdmin(): boolean {
    return this.getRoles().includes('ADMIN');
  }

  isUser(): boolean {
    return this.getRoles().includes('USER');
  }
}

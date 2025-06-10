import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private rol: 'USUARIO' | 'EMPLEADO' | 'ADMIN' | null = null;

  constructor(private http: HttpClient) {}

  login(url: string, credentials: { correo: string; contrasenia: string }): Observable<any> {
    return this.http.post(url, credentials);
  }

  // Guardo token y rol en memoria
  setSession(token: string, rol: 'ADMIN' | 'USUARIO' | 'EMPLEADO') {
  this.token = token;
  this.rol = rol;
}


  getToken(): string | null {
    return this.token;
  }

  getRol(): 'USUARIO' | 'EMPLEADO' | 'ADMIN' | null {
    return this.rol;
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  logout(): void {
    this.token = null;
    this.rol = null;
  }
}

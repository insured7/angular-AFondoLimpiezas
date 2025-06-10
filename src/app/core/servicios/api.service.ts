import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}
  // URL base del backend
  private baseUrl = 'http://localhost:8080';


  //Login y Registrar empleado
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  registrarUsuario(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/registro-usuario`, data);
  }

  //Usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuarios`);
  }

  getUsuario(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios/${id}`);
  }


  //Empleados
  getEmpleados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/empleados`);
  }

  getDatosEmpleado(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get<any>(`${this.baseUrl}/dashboard/empleado`, { headers });
  }


  //Presupuesto
  crearPresupuesto(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/solicitudes`, data);
  }

  //Solicitudes
  getSolicitudes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/solicitudes`);
  }

  getSolicitudPorId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/solicitudes/${id}`);
  }

  editarSolicitud(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/solicitudes/${id}`, data);
  }


}

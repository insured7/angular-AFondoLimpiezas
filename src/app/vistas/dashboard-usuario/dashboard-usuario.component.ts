import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../core/servicios/auth.service'; // Ajusta ruta
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard-usuario',
  templateUrl: './dashboard-usuario.component.html',
  styleUrls: ['./dashboard-usuario.component.css'],
  imports: [NgFor, NgClass, NgIf]
})
export class DashboardUsuarioComponent implements OnInit {
  nombreUsuario = 'Usuario';
  correoUsuario = 'No disponible';
  listaServicios: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken();

    if (!token) {
      alert('No has iniciado sesión.');
      this.router.navigate(['/login']);
      return;
    }

    this.cargarDatosUsuario(token);
    this.cargarSolicitudes(token);
  }

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
  }

  cargarDatosUsuario(token: string) {
    this.http.get<any>('http://localhost:8080/dashboard/usuario', { headers: this.getHeaders(token) }).subscribe({
      next: (data) => {
        this.nombreUsuario = data.nombre || 'Usuario';
        this.correoUsuario = data.correo || 'No disponible';
      },
      error: (err) => {
        alert('Error al cargar datos del usuario.');
        console.error(err);
      }
    });
  }

  cargarSolicitudes(token: string) {
  this.http.get<any[]>('http://localhost:8080/dashboard/usuario/solicitudes', { headers: this.getHeaders(token) }).subscribe({
    next: (data) => {
      if (data.length === 0) {

        this.listaServicios = [{ mensaje: 'No hay solicitudes registradas.' }];
      } else {
        this.listaServicios = data;
      }
    },
    error: (err) => {
      console.error('Error al cargar solicitudes:', err);

      this.listaServicios = [{ mensaje: 'Error al cargar solicitudes.' }];
    }
  });
}
}

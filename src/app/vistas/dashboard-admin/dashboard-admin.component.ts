import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/servicios/auth.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  solicitudes: any[] = [];
  mostrarTabla = false;
  mensajeSinSolicitudes = false;
  alerta = { mensaje: '', tipo: '' };

  solicitudId = 0;
  empleadoId = 0;
  rolEmpleado = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    const rol = this.authService.getRol();

    if (!token || rol !== 'ADMIN') {
      alert('Acceso denegado.');
      this.router.navigate(['/login']);
      return;
    }

    this.cargarSolicitudes(token);
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: 'Bearer ' + this.authService.getToken() });
  }

  cargarSolicitudes(token: string): void {
    this.http.get<any[]>('http://localhost:8080/admin/solicitudes', { headers: this.getHeaders() }).subscribe({
      next: (data) => {
        if (!data.length) {
          this.mensajeSinSolicitudes = true;
          this.mostrarTabla = false;
        } else {
          this.solicitudes = data;
          this.mensajeSinSolicitudes = false;
          this.mostrarTabla = true;
        }
      },
      error: () => this.mostrarAlerta('Error al cargar solicitudes.', 'danger')
    });
  }

  editarSolicitud(id: number): void {
    this.router.navigate(['/admin/editar-solicitud', id]);
  }

  eliminarSolicitud(id: number): void {
    if (!confirm(`¿Eliminar solicitud ID ${id}?`)) return;

    this.http.delete(`http://localhost:8080/admin/solicitudes/${id}`, { headers: this.getHeaders() }).subscribe({
      next: () => {
        this.mostrarAlerta('Solicitud eliminada.', 'success');
        this.cargarSolicitudes(this.authService.getToken()!);
      },
      error: () => this.mostrarAlerta('No se pudo eliminar la solicitud.', 'danger')
    });
  }

  asignarEmpleado(): void {
  if (!this.solicitudId || !this.empleadoId || !this.rolEmpleado.trim()) {
    alert('Por favor completa todos los campos.');
    return;
  }

  const body = {
    solicitudId: this.solicitudId,
    empleadoId: this.empleadoId,
    rol: this.rolEmpleado
  };

  this.http.post('http://localhost:8080/admin/solicitudes/asignar-empleado', body, {
    headers: this.getHeaders(),
    responseType: 'text' // esperando texto plano del backend
  }).subscribe({
    next: (res) => alert(res),
    error: (err) => {
      // err puede ser un HttpErrorResponse
      let mensajeError = 'Error al asignar empleado.';

      if (err.error) {
        try {
          // Intenta parsear mensaje JSON si el backend devuelve JSON en error
          const parsed = JSON.parse(err.error);
          if (parsed.message) {
            mensajeError = parsed.message;
          } else if (typeof err.error === 'string') {
            mensajeError = err.error;
          }
        } catch {
          // Si no es JSON, úsalo tal cual si es string
          if (typeof err.error === 'string') {
            mensajeError = err.error;
          }
        }
      }

      alert(mensajeError);
    }
  });
}


  mostrarAlerta(mensaje: string, tipo: string): void {
    this.alerta = { mensaje, tipo };
    setTimeout(() => this.alerta = { mensaje: '', tipo: '' }, 4000);
  }
}
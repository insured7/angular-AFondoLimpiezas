import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/servicios/auth.service';
import { ApiService } from '../../core/servicios/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-empleado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-empleado.component.html',
  styles: []
})
export class DashboardEmpleadoComponent implements OnInit {
  nombreEmpleado = 'Empleado';
  correoEmpleado = 'No disponible';
  direccionEmpleado = 'No disponible';
  telefonoEmpleado = 'No disponible';

  constructor(private authService: AuthService, private apiService: ApiService) {}

  ngOnInit(): void {
    const token = this.authService.getToken();

    if (!token) {
      alert('No has iniciado sesión.');
      // Aquí deberías redirigir a login con Angular Router, ejemplo:
      // this.router.navigate(['/login']);
      return;
    }

    this.apiService.getDatosEmpleado(token).subscribe({
      next: (data) => {
        this.nombreEmpleado = data.nombre || this.nombreEmpleado;
        this.correoEmpleado = data.correo || this.correoEmpleado;
        this.direccionEmpleado = data.direccion || this.direccionEmpleado;
        this.telefonoEmpleado = data.telefono || this.telefonoEmpleado;
      },
      error: (err) => {
        alert('Error al cargar datos del empleado.');
        console.error(err);
      }
    });
  }
}

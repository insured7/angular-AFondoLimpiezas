import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../core/servicios/auth.service';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-editar-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './editar-solicitud.component.html'
})
export class EditarSolicitudComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  errorMessage = '';
  token: string | null = null;
  rol: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.rol = this.authService.getRol();

    if (!this.token || this.rol !== 'ADMIN') {
      alert('Acceso no autorizado');
      this.router.navigate(['/login']);
      return;
    }

    this.id = this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      estado: ['Pendiente', Validators.required],
      detalles: ['', Validators.required],
      direccion: ['', Validators.required],
    });

    this.cargarSolicitud();
  }

  cargarSolicitud() {
    this.http.get<any>(`http://localhost:8080/admin/solicitudes/${this.id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }).subscribe({
      next: (data) => {
        this.form.patchValue({
          estado: data.estado,
          detalles: data.detalles,
          direccion: data.direccion,
        });
      },
      error: () => {
        alert('No se pudo cargar la solicitud.');
        this.router.navigate(['/dashboard-admin']);
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.http.put(`http://localhost:8080/admin/solicitudes/${this.id}`, this.form.value, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.token}`)
        .set('Content-Type', 'application/json')
    }).subscribe({
      next: () => {
        alert('Solicitud actualizada correctamente.');
        this.router.navigate(['/dashboard-admin']);
      },
      error: () => {
        this.errorMessage = 'Error al guardar los cambios.';
      }
    });
  }
}

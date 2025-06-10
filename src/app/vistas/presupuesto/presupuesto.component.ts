import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/servicios/auth.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-presupuesto',
  imports: [NgIf, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './presupuesto.component.html',
  styleUrl: './presupuesto.component.css'
})
export class PresupuestoComponent implements OnInit {
  form!: FormGroup;
  mensaje = '';
  exito = false;
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      alert('Debes iniciar sesión para solicitar presupuesto.');
      this.router.navigate(['/login']);
      return;
    }

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      detalles: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.cargando = true;
    this.mensaje = '';

    const token = this.authService.getToken();

    this.http.post('http://localhost:8080/solicitudes', this.form.value, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      responseType: 'text'
    }).subscribe({
      next: (res) => {
        this.exito = true;
        this.mensaje = 'Presupuesto enviado correctamente. ¡Gracias!';
        this.form.reset();
        this.cargando = false;
      },
      error: (err) => {
        this.exito = false;
        this.mensaje = 'Hubo un problema al enviar el presupuesto.';
        this.cargando = false;
      }
    });
  }
}

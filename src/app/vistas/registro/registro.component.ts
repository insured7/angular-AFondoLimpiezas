import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {
  form!: FormGroup;
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, this.telefonoValidator]],
      contrasenia: ['', Validators.required]
    });
  }

  telefonoValidator(control: AbstractControl): ValidationErrors | null {
    const val = control.value ? control.value.trim().replace(/\D/g, '') : '';
    return val.length === 9 ? null : { telefonoInvalido: true };
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.cargando = true;
    const datos = {
      ...this.form.value,
      telefono: this.form.value.telefono.trim().replace(/\D/g, '')
    };

    this.http.post('http://localhost:8080/auth/registro-usuario', datos, { responseType: 'text' })
      .subscribe({
        next: () => {
          alert('Registro exitoso.');
          this.router.navigate(['/']);
        },
        error: (err) => {
          err.error ? alert('Error al registrar: ' + err.error) : alert('Error de conexión con el servidor.');
          this.cargando = false;
        }
      });
  }
}

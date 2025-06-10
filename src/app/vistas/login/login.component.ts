import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../core/servicios/auth.service';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, ReactiveFormsModule, RouterModule, NgIf, RouterLink]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required],
      userType: ['user', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { correo, contrasenia, userType } = this.loginForm.value;
    const loginUrl =
  userType === 'user' || userType === 'admin'
    ? 'http://localhost:8080/auth/login-usuario'
    : 'http://localhost:8080/auth/login-empleado';

this.authService.login(loginUrl, { correo, contrasenia }).subscribe({
  next: (data) => {
    if (!data.token) throw new Error('No se recibió token');

let rol: 'ADMIN' | 'USUARIO' | 'EMPLEADO';

if (userType === 'user') {
  rol = 'USUARIO';
} else if (userType === 'employee' || userType === 'admin') {
  rol = data.esAdmin ? 'ADMIN' : 'EMPLEADO';
} else {
  rol = 'USUARIO';
}


this.authService.setSession(data.token, rol);


    const redireccion =
      rol === 'USUARIO' ? '/dashboard-usuario' :
      rol === 'ADMIN'   ? '/dashboard-admin' :
                          '/dashboard-empleado';

    this.router.navigate([redireccion]);
  },
  error: (err) => {
    this.errorMessage = 'Correo o contraseña incorrectos';
    console.error(err);
  }
});
  }

}


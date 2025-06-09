import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/servicios/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  imports: [NgIf],
})
export class CabeceraComponent {
  constructor(public auth: AuthService, private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  get rol() {
    return this.auth.getRol();
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }
}

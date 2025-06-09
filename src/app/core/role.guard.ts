// src/app/guards/role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../core/servicios/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['expectedRole'];
  const actualRole = auth.getRol();

  if (expectedRole !== actualRole) {
    alert(`No tienes acceso al panel de ${expectedRole.toLowerCase()}.`);
    router.navigate(['/']);
    return false;
  }

  return true;
};

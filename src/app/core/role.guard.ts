// src/app/guards/role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../core/servicios/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['expectedRole'];
  const actualRole = auth.getRol();

  console.log('expectedRole:', expectedRole);
  console.log('actualRole:', actualRole);

  if (!actualRole || expectedRole.toLowerCase() !== actualRole.toLowerCase()) {
    alert(`No tienes acceso al panel de ${expectedRole.toLowerCase()}.`);
    router.navigate(['/login']);
    return false;
  }

  return true;
};


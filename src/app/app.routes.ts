import { Routes } from '@angular/router';
import { LangingPageComponent } from './vistas/langing-page/langing-page.component';
import { SobreNosotrosComponent } from './vistas/sobre-nosotros/sobre-nosotros.component';
import { LoginComponent } from './vistas/login/login.component';

import { authGuard } from '../app/core/auth.guard';
import { roleGuard } from '../app/core/role.guard';

import { DashboardUsuarioComponent } from './vistas/dashboard-usuario/dashboard-usuario.component';
import { DashboardEmpleadoComponent } from './vistas/dashboard-empleado/dashboard-empleado.component';

export const routes: Routes = [
  { path: '', component: LangingPageComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard-usuario',
    component: DashboardUsuarioComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'USUARIO' }
  },
  {
    path: 'dashboard-empleado',
    component: DashboardEmpleadoComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'EMPLEADO' }
  },

  // Puedes añadir otras rutas protegidas aquí
];

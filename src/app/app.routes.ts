import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/heroes' },
  { path: 'heroes', loadChildren: () => import('./components/heroes/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
];

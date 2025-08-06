import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { BoardViewComponent } from './pages/board-view/board-view.component';
import { DashboardViewComponent } from './pages/dashboard-view/dashboard-view.component';
import { MAIN_ROUTES } from './main-layout/main.routes';
import { AuthGuard } from './core/guards/auth.guard';
import { noop } from 'rxjs';
import { NoAuthGuard } from './core/guards/no-auth.guard';


export const routes: Routes = [
  {
    path: '',
    children: MAIN_ROUTES,
    canActivate: [AuthGuard], // Protect all main routes
  },
  {
    path: 'auth',
    children: AUTH_ROUTES,
    canActivate:[NoAuthGuard]
  },
  {
    path: 'board/:id',
    component: BoardViewComponent,
    title: 'Project Board',
    canActivate: [AuthGuard], // Protect board route
  },
  
];

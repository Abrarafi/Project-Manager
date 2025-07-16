import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { BoardViewComponent } from './pages/board-view/board-view.component';
import { DashboardViewComponent } from './pages/dashboard-view/dashboard-view.component';
import { MAIN_ROUTES } from './main-layout/main.routes';

export const routes: Routes = [
  {
    path: '',
    children: MAIN_ROUTES,
  },
  {
    path: 'auth',
    children: AUTH_ROUTES,
  },
  {
    path: 'board',
    component: BoardViewComponent,
    title: 'Project Board',
  },
  
];

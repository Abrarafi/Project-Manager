import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { BoardViewComponent } from './pages/board-view/board-view.component';

export const routes: Routes = [
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

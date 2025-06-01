import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './components/auth/auth.routes';

export const routes: Routes = [
    {
        path: 'auth',
        children:AUTH_ROUTES
    }
];

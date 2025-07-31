import { Routes } from '@angular/router';
import { AuthGuard, RoleGuard, NoAuthGuard } from './index';

// Example route configurations showing how to use the guards

export const EXAMPLE_ROUTES: Routes = [
  // Public routes (no guard needed)
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },

  // Auth routes - prevent authenticated users from accessing
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [NoAuthGuard], // Prevents authenticated users from accessing
        title: 'Login',
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NoAuthGuard], // Prevents authenticated users from accessing
        title: 'Register',
      },
    ],
  },

  // Protected routes - require authentication
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Requires authentication
    title: 'Dashboard',
  },

  // Role-based protected routes
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard], // Requires authentication AND specific role
    data: { roles: ['admin'] }, // Only users with 'admin' role can access
    title: 'Admin Panel',
  },

  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'manager'] }, // Users with 'admin' OR 'manager' role can access
    title: 'Projects',
  },

  // Nested protected routes
  {
    path: 'board',
    component: BoardLayoutComponent,
    canActivate: [AuthGuard], // Parent route protection
    children: [
      {
        path: ':id',
        component: BoardViewComponent,
        canActivate: [RoleGuard], // Child route with role check
        data: { roles: ['admin', 'manager', 'member'] },
        title: 'Project Board',
      },
    ],
  },
];

// Alternative: Using functional guards (Angular 14+)
export const FUNCTIONAL_GUARD_EXAMPLE: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
    title: 'Dashboard',
  },
];

// Usage in your main app.routes.ts:
/*
import { Routes } from '@angular/router';
import { AuthGuard, RoleGuard, NoAuthGuard } from './core/guards';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { MAIN_ROUTES } from './main-layout/main.routes';

export const routes: Routes = [
  {
    path: '',
    children: MAIN_ROUTES,
    canActivate: [AuthGuard] // Protect all main routes
  },
  {
    path: 'auth',
    children: AUTH_ROUTES,
    canActivate: [NoAuthGuard] // Prevent authenticated users from accessing auth routes
  },
  {
    path: 'board',
    component: BoardViewComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'manager', 'member'] },
    title: 'Project Board',
  },
];
*/

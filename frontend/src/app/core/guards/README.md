# Authentication Guards

This directory contains Angular route guards for handling authentication and authorization in the Project Manager application.

## Available Guards

### 1. AuthGuard

Protects routes by ensuring the user is authenticated. If not authenticated, redirects to the login page.

**Usage:**

```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard]
}
```

### 2. NoAuthGuard

Prevents authenticated users from accessing login/register pages. If authenticated, redirects to dashboard.

**Usage:**

```typescript
{
  path: 'login',
  component: LoginComponent,
  canActivate: [NoAuthGuard]
}
```

### 3. RoleGuard

Provides role-based access control. Requires authentication and checks if the user has the required roles.

**Usage:**

```typescript
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: ['admin'] }
}
```

## Implementation Examples

### Basic Route Protection

```typescript
import { Routes } from "@angular/router";
import { AuthGuard, NoAuthGuard } from "./core/guards";

export const routes: Routes = [
  {
    path: "auth",
    children: [
      {
        path: "login",
        component: LoginComponent,
        canActivate: [NoAuthGuard],
      },
      {
        path: "register",
        component: RegisterComponent,
        canActivate: [NoAuthGuard],
      },
    ],
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];
```

### Role-Based Protection

```typescript
{
  path: 'projects',
  component: ProjectsComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: ['admin', 'manager'] }
}
```

### Nested Route Protection

```typescript
{
  path: 'board',
  component: BoardLayoutComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: ':id',
      component: BoardViewComponent,
      canActivate: [RoleGuard],
      data: { roles: ['admin', 'manager', 'member'] }
    }
  ]
}
```

## User Model Requirements

For the RoleGuard to work properly, your User model should include a `roles` property:

```typescript
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  roles?: string[]; // Array of user roles
}
```

## Best Practices

1. **Always use AuthGuard first** when combining with RoleGuard
2. **Use NoAuthGuard** for login/register pages to prevent authenticated users from accessing them
3. **Define roles clearly** in your route data
4. **Handle unauthorized access** by redirecting to appropriate pages
5. **Test guards thoroughly** with different user states and roles

## Error Handling

The guards automatically handle:

- Unauthenticated users → Redirect to login
- Authenticated users trying to access auth pages → Redirect to dashboard
- Users without required roles → Redirect to dashboard (configurable)

## Testing

To test the guards, you can:

1. Try accessing protected routes without authentication
2. Try accessing auth pages while authenticated
3. Test role-based access with different user roles
4. Verify redirects work correctly

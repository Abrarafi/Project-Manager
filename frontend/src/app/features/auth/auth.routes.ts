import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BoardViewComponent } from '../../pages/board-view/board-view.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login - Project Manager',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register - Project Manager',
  },
];

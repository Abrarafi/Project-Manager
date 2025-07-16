import { Routes } from '@angular/router';
import { DashboardViewComponent } from '../pages/dashboard-view/dashboard-view.component';
import { MainLayoutComponent } from './main-layout.component';

export const MAIN_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardViewComponent,
        title: 'Dashboard - Project Manager',
      },
    ],
  },
];
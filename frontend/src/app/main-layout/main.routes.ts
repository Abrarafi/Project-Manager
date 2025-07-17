import { Routes } from '@angular/router';
import { DashboardViewComponent } from '../pages/dashboard-view/dashboard-view.component';
import { MainLayoutComponent } from './main-layout.component';
import { ActiveProjectsComponent } from '../pages/active-projects/active-projects.component';
import { MyTasksComponent } from '../pages/my-tasks/my-tasks.component';
import { MyProjectsComponent } from '../pages/my-projects/my-projects.component';
import { ProjectHistoryComponent } from '../pages/project-history/project-history.component';

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
      {
        path: 'projects/active',
        component: ActiveProjectsComponent,
        title: 'Active Projects',
      },
      {
        path: 'tasks/my',
        component: MyTasksComponent,
        title: 'My Tasks',
      },
      {
        path: 'projects/my',
        component: MyProjectsComponent,
        title: 'My Projects',
      },
      {
        path: 'projects/history',
        component: ProjectHistoryComponent,
        title: 'Project History',
      },
    ],
  },
];

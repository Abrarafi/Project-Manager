import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
interface MenuItem {
  icon: string;
  label: string;
  route?:string;
  children?: MenuItem[];
  isOpen?: boolean;
}
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
   @Input() isSidebarCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<void>();
constructor(private router: Router) { }

  menuItems: MenuItem[] = [
    {
      icon: 'fas fa-home',
      label: 'Dashboard',
      route: '/dashboard',
      isOpen: false,
      // children: [
      //   { icon: 'fas fa-chart-pie', label: 'Analytics' },
      //   { icon: 'fas fa-tasks', label: 'Projects' },
      // ]
    },
    {
      icon: 'fas fa-project-diagram',
      label: 'Active Projects',
      route: '/dashboard',
    },
     {
      icon: 'fas fa-tasks',
      label: 'My Tasks',
      route: '/dashboard',
    },
     {
      icon: 'fas fa-layer-group',
      label: 'My Projects',
      route: '/dashboard',
    },
     {
      icon: 'fas fa-history',
      label: 'Project History',
      route: '/dashboard',
    },
    {
      icon: 'fas fa-cog',
      label: 'Settings',
      isOpen: false,
      children: [
        { icon: 'fas fa-user', label: 'Profile' },
        { icon: 'fas fa-lock', label: 'Security' },
      ]
    },
    {
      icon: 'fas fa-envelope',
      label: 'Messages'
    }
  ];

  isRouteActive(route?: string): boolean {
    if (!route) return false;
    return this.router.isActive(route, { paths: 'exact', queryParams: 'ignored', fragment: 'ignored', matrixParams: 'ignored' });
  }

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  toggleMenuItem(item: MenuItem) {
    // Only toggle if sidebar is not collapsed and item has children
    if (!this.isSidebarCollapsed && item.children) {
      item.isOpen = !item.isOpen;
    }
  }
}

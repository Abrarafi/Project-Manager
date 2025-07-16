import { Component, Input, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @Input() title: string = 'My App';

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
